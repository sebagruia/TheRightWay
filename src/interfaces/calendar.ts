export interface CalendarEvent {
  summary: string;
  location?: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

/**
 * Google Calendar Event Type
 * Based on Google Calendar API v3 Event resource
 * https://developers.google.com/workspace/calendar/api/v3/reference/events#properties
 */

export type ResponseStatus = 'needsAction' | 'declined' | 'tentative' | 'accepted';

export type ConferenceSolutionType = 'eventHangout' | 'eventNamedHangout' | 'hangoutsMeet' | 'addOn';

export type BirthdayType = 'anniversary' | 'birthday' | 'custom' | 'other' | 'self';

export type WorkingLocationType = 'homeOffice' | 'officeLocation' | 'customLocation';

export type AutoDeclineMode = 'declineOnlyIfAtCapacity' | 'declineAll';

export type ChatStatus = 'available' | 'busy' | 'doNotDisturb';

export interface EventDateTime {
  date?: string; // Date in YYYY-MM-DD format
  dateTime?: string; // RFC3339 timestamp
  timeZone?: string;
}

export interface Person {
  id?: string;
  email?: string;
  displayName?: string;
  self?: boolean;
}

export interface Attendee extends Person {
  organizer?: boolean;
  resource?: boolean;
  optional?: boolean;
  responseStatus?: ResponseStatus;
  comment?: string;
  additionalGuests?: number;
}

export interface ExtendedProperties {
  private?: Record<string, string>;
  shared?: Record<string, string>;
}

export interface ConferenceCreateRequest {
  requestId?: string;
  conferenceSolutionKey?: {
    type: string;
  };
  status?: {
    statusCode?: string;
  };
}

export interface ConferenceEntryPoint {
  entryPointType?: string;
  uri?: string;
  label?: string;
  pin?: string;
  accessCode?: string;
  meetingCode?: string;
  passcode?: string;
  password?: string;
}

export interface ConferenceSolution {
  key?: {
    type?: ConferenceSolutionType;
  };
  name?: string;
  iconUri?: string;
}

export interface ConferenceData {
  createRequest?: ConferenceCreateRequest;
  entryPoints?: ConferenceEntryPoint[];
  conferenceSolution?: ConferenceSolution;
  conferenceId?: string;
  signature?: string;
  notes?: string;
}

export interface Gadget {
  type?: string;
  title?: string;
  link?: string;
  iconLink?: string;
  width?: number;
  height?: number;
  display?: string;
  preferences?: Record<string, string>;
}

export interface ReminderOverride {
  method?: string;
  minutes?: number;
}

export interface Reminders {
  useDefault?: boolean;
  overrides?: ReminderOverride[];
}

export interface Source {
  url?: string;
  title?: string;
}

export interface CustomLocation {
  label?: string;
}

export interface OfficeLocation {
  buildingId?: string;
  floorId?: string;
  floorSectionId?: string;
  deskId?: string;
  label?: string;
}

export interface WorkingLocationProperties {
  type?: WorkingLocationType;
  homeOffice?: any; // The API docs show (value) which suggests any type
  customLocation?: CustomLocation;
  officeLocation?: OfficeLocation;
}

export interface OutOfOfficeProperties {
  autoDeclineMode?: AutoDeclineMode;
  declineMessage?: string;
}

export interface FocusTimeProperties {
  autoDeclineMode?: AutoDeclineMode;
  declineMessage?: string;
  chatStatus?: ChatStatus;
}

export interface Attachment {
  fileUrl?: string; // Required when adding an attachment
  title?: string;
  mimeType?: string;
  iconLink?: string;
  fileId?: string; // Read-only
}

export interface BirthdayProperties {
  contact?: string; // Read-only
  type?: BirthdayType;
  customTypeName?: string; // Read-only
}

/**
 * Google Calendar Event
 *
 * Based on the API documentation, the following fields appear to be required:
 * - start: Event start time (either date or dateTime must be specified)
 * - end: Event end time (either date or dateTime must be specified)
 *
 * All other fields are optional according to the API documentation.
 */
export interface GoogleCalendarEvent {
  // Core properties - mostly read-only from API
  kind?: 'calendar#event';
  etag?: string;
  id?: string;
  status?: string;
  htmlLink?: string;
  created?: string; // datetime
  updated?: string; // datetime

  // Event details - writable
  summary?: string;
  description?: string;
  location?: string;
  colorId?: string;

  // People
  creator?: Person;
  organizer?: Person;

  // Required: Event timing
  start: EventDateTime; // Required - at least one of date or dateTime must be specified
  end: EventDateTime; // Required - at least one of date or dateTime must be specified

  // Optional timing properties
  endTimeUnspecified?: boolean;
  originalStartTime?: EventDateTime;

  // Recurrence
  recurrence?: string[];
  recurringEventId?: string;

  // Event properties
  transparency?: string;
  visibility?: string;
  iCalUID?: string;
  sequence?: number;

  // Attendees
  attendees?: Attendee[];
  attendeesOmitted?: boolean;

  // Extended data
  extendedProperties?: ExtendedProperties;

  // Conference/Meeting
  hangoutLink?: string;
  conferenceData?: ConferenceData;

  // Gadget (deprecated)
  gadget?: Gadget;

  // Guest permissions
  anyoneCanAddSelf?: boolean;
  guestsCanInviteOthers?: boolean;
  guestsCanModify?: boolean;
  guestsCanSeeOtherGuests?: boolean;

  // Event settings
  privateCopy?: boolean;
  locked?: boolean;

  // Notifications
  reminders?: Reminders;

  // Source
  source?: Source;

  // Working location (for workspace events)
  workingLocationProperties?: WorkingLocationProperties;

  // Out of office
  outOfOfficeProperties?: OutOfOfficeProperties;

  // Focus time
  focusTimeProperties?: FocusTimeProperties;

  // Attachments
  attachments?: Attachment[];

  // Birthday events
  birthdayProperties?: BirthdayProperties;

  // Event type
  eventType?: string;
}

/**
 * Minimal event for creating a new calendar event
 * Only includes the truly required fields for event creation
 */
export interface MinimalCalendarEvent {
  summary?: string;
  start: EventDateTime;
  end: EventDateTime;
}

/**
 * Common event creation interface with frequently used optional fields
 */
export interface CreateCalendarEvent extends MinimalCalendarEvent {
  description?: string;
  location?: string;
  attendees?: Attendee[];
  reminders?: Reminders;
  conferenceData?: ConferenceData;
}
