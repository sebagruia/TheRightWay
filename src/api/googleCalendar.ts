import { useSelector } from 'react-redux';
import { CalendarEvent } from '../interfaces/calendar';
import { InitialState } from '../interfaces/store';
import { stateMapping } from '../redux/stateMapping';

export const useGoogleCalendar = () => {
  const gooleCalendarAccessToken = useSelector((state: InitialState) => {
    const sm = stateMapping(state);
    return sm.googleCalendarAccessToken;
  });
  const addGoogleCalendarEvent = async (eventData: CalendarEvent) => {
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${gooleCalendarAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }

    const data = await response.json();
    console.log('Event created:', data);
    return data;
  };

  return {
    addGoogleCalendarEvent,
    gooleCalendarAccessToken,
  };
};
