import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';

import { setModalMessage } from '../redux/user/userActions';
import { setGlobalLoadingAction } from '../redux/global/globalActions';
import { selectGoogleCalendarAccessToken } from '../redux/user/userSelectors';

import { auth } from '../firebase/firebase.utils';
import { API_ENDPOINTS } from '../config/api';

import { CalendarEvent } from '../interfaces/calendar';
import { ModalHeaderBackground } from '../interfaces/modal';

export const useGoogleCalendar = () => {
  const dispatch = useAppDispatch();

  const isGoogleCalendarConnected = useSelector(selectGoogleCalendarAccessToken);

  const addGoogleCalendarEvent = async (eventData: CalendarEvent): Promise<{ success: boolean; data?: any }> => {
    const user = auth.currentUser;
    if (!user) {
      dispatch(
        setModalMessage({
          title: 'Error',
          content: 'User not authenticated',
          headerBackground: ModalHeaderBackground.error,
        }),
      );
      return { success: false };
    }

    const idToken = await user.getIdToken();

    try {
      dispatch(setGlobalLoadingAction(true));

      const response = await fetch(API_ENDPOINTS.CALENDAR_EVENTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
          event: eventData,
        }),
      });

      if (!response.ok) {
        dispatch(setGlobalLoadingAction(false));

        const errorData = await response.json();

        console.log('Error response from calendar event API:', errorData);
        console.log('Response status:', response);

        switch (errorData.data?.error?.code || response.status) {
          case 401:
            dispatch(
              setModalMessage({
                title: 'Session Expired',
                content: 'Please sign in with Google again to reconnect Calendar',
                headerBackground: ModalHeaderBackground.error,
                closeText: 'Close',
                redirectPath: {
                  pathName: '/login',
                  buttonText: 'Login',
                },
              }),
            );
            break;

          case 400:
            dispatch(
              setModalMessage({
                title: 'Invalid Request',
                content: errorData.error || 'Please check your event details',
                headerBackground: ModalHeaderBackground.error,
                closeText: 'Close',
              }),
            );
            break;

          case 403:
            dispatch(
              setModalMessage({
                title: 'Permission Denied',
                content: 'Calendar access was revoked. Please reconnect your Google account',
                headerBackground: ModalHeaderBackground.error,
                closeText: 'Close',
                redirectPath: {
                  pathName: '/login',
                  buttonText: 'Login',
                },
              }),
            );
            break;

          default:
            dispatch(
              setModalMessage({
                title: 'Error',
                content: errorData.error || 'Failed to create calendar event',
                headerBackground: ModalHeaderBackground.error,
                closeText: 'Close',
              }),
            );
        }
        return { success: false };
      }

      const data = await response.json();
      dispatch(setGlobalLoadingAction(false));
      dispatch(
        setModalMessage({
          title: 'Success',
          content: data.message,
          headerBackground: ModalHeaderBackground.success,
          closeText: 'Close',
        }),
      );
      return data;
    } catch (error) {
      dispatch(setGlobalLoadingAction(false));
      console.error('Error adding calendar event:', error);
      return { success: false };
    }
  };

  return {
    addGoogleCalendarEvent,
    isGoogleCalendarConnected,
  };
};
