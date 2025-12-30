import { useSelector, useDispatch } from 'react-redux';
import { CalendarEvent } from '../interfaces/calendar';
import { InitialStateList } from '../interfaces/store';
import { stateMapping } from '../redux/stateMapping';
import { auth } from '../firebase/firebase.utils';
import { ModalHeaderBackground } from '../interfaces/modal';
import { setModalMessage } from '../redux/user/userActions';
import { API_ENDPOINTS } from '../config/api';

export const useGoogleCalendar = () => {
  const dispatch = useDispatch();

  const isGoogleCalendarConnected = useSelector((state: InitialStateList) => {
    const sm = stateMapping(state);
    return sm.googleCalendarAccessToken;
  });

  const addGoogleCalendarEvent = async (eventData: CalendarEvent): Promise<any | null> => {
    const user = auth.currentUser;
    if (!user) {
      dispatch(
        setModalMessage({
          title: 'Error',
          content: 'User not authenticated',
          headerBackground: ModalHeaderBackground.error,
        }),
      );
      return null;
    }

    const idToken = await user.getIdToken();

    try {
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
        return null;
      }

      const data = await response.json();
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
      console.error('Error adding calendar event:', error);
    }
  };

  return {
    addGoogleCalendarEvent,
    isGoogleCalendarConnected,
  };
};
