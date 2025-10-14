import { useSelector, useDispatch } from 'react-redux';
import { CalendarEvent } from '../interfaces/calendar';
import { InitialState } from '../interfaces/store';
import { stateMapping } from '../redux/stateMapping';
import { auth } from '../firebase/firebase.utils';
import { ModalHeaderBackground } from '../interfaces/modal';
import { setModalMessage } from '../redux/user/userActions';
import { API_ENDPOINTS } from '../config/api';

export const useGoogleCalendar = () => {
  const dispatch = useDispatch();

  const isGoogleCalendarConnected = useSelector((state: InitialState) => {
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
      console.error('Error creating event:', errorData.error);
      dispatch(
        setModalMessage({
          title: 'Error',
          content: errorData.error,
          headerBackground: ModalHeaderBackground.error,
        }),
      );
      return null;
    }

    const data = await response.json();
    console.log('Event created:', data);
    return data;
  };

  return {
    addGoogleCalendarEvent,
    isGoogleCalendarConnected,
  };
};
