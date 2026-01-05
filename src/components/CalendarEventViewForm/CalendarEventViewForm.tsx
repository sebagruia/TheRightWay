import React, { FC } from 'react';
import styles from './CalendarEventViewForm.module.scss';

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

import CalendarEventFormSkeleton from './CalendarEventFormSkeleton';
import AttendeesList from '../AttendeesList/AttendeesList';

import { GoogleCalendarEvent, Attendee } from '../../interfaces/calendar';

import { MdPersonAddAlt } from 'react-icons/md';

interface IProps {
  listName: string;
  closeEventForm: () => void;
  show: boolean;
  apiCall: (eventData: GoogleCalendarEvent) => Promise<{ success: boolean }>;
  isLoading?: boolean;
}

interface FormData {
  summary: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
  attendee?: Attendee[];
  emailInput?: string;
}

const CalendarEventViewForm: FC<IProps> = ({ listName, show, closeEventForm, apiCall, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      summary: '',
      location: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      description: '',
      attendee: [],
      emailInput: '',
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'attendee',
    control,
  });

  const isEmailInList = (email: string): boolean => {
    return fields.some((attendee) => attendee.email === email);
  };

  const addAttendee = () => {
    const email = getValues('emailInput');
    if (email?.trim()) {
      if (isEmailInList(email)) {
        return;
      }
      append({ email: email.trim() });
      setValue('emailInput', '');
    }
  };
  const removeAttendee = (index: number) => {
    remove(index);
  };

  const mapToCalendarEventPayload = (formValues: FormData): GoogleCalendarEvent => {
    return {
      summary: formValues.summary,
      location: formValues.location,
      description: formValues.description,
      start: {
        dateTime: `${formValues.startDate}T${formValues.startTime}:00`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: `${formValues.endDate}T${formValues.endTime}:00`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: formValues.attendee,
    };
  };

  const submitForm: SubmitHandler<FormData> = async (values) => {
    const calendarEventPayload = mapToCalendarEventPayload(values);
    const response = await apiCall?.(calendarEventPayload);
    if (response.success === true) {
      closeEventForm();
    }
  };

  return (
    <Modal className={styles.calendarEventView} show={show} backdrop="static" size="lg">
      <Modal.Header closeButton onClick={closeEventForm}>
        <Modal.Title>{listName ?? 'Create New Event'}</Modal.Title>
      </Modal.Header>
      {isLoading ? (
        <CalendarEventFormSkeleton />
      ) : (
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className={styles.formSection} controlId="formTitle">
              <Form.Label>Event Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                {...register('summary', { required: 'Title is required' })}
                isInvalid={!!errors.summary}
              />
              <Form.Control.Feedback type="invalid">{errors.summary?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={styles.formSection} controlId="formLocation">
              <Form.Label>Location *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                {...register('location', { required: 'Location is required' })}
                isInvalid={!!errors.location}
              />
              <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className={`${styles.formSection} ${styles.dateTimeRow}`} controlId="formStartDate">
              <Form.Label column sm={2}>
                Start *
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  className="mb-3 mb-sm-0"
                  {...register('startDate', { required: 'Start date is required' })}
                  isInvalid={!!errors.startDate}
                />
                <Form.Control.Feedback type="invalid">{errors.startDate?.message}</Form.Control.Feedback>
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="time"
                  {...register('startTime', { required: 'Start time is required' })}
                  isInvalid={!!errors.startTime}
                />
                <Form.Control.Feedback type="invalid">{errors.startTime?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className={`${styles.formSection} ${styles.dateTimeRow}`} controlId="formEndDate">
              <Form.Label column sm={2}>
                End *
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  className="mb-3 mb-sm-0"
                  {...register('endDate', { required: 'End date is required' })}
                  isInvalid={!!errors.endDate}
                />
                <Form.Control.Feedback type="invalid">{errors.endDate?.message}</Form.Control.Feedback>
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="time"
                  {...register('endTime', { required: 'End time is required' })}
                  isInvalid={!!errors.endTime}
                />
                <Form.Control.Feedback type="invalid">{errors.endTime?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className={`${styles.formSection} ${styles.guestInputWrapper}`} controlId="formGuests">
              <Form.Label>Add Guests</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Form.Control
                  type="email"
                  placeholder="Enter guest email"
                  {...register('emailInput')}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAttendee())}
                />
                <MdPersonAddAlt
                  onClick={addAttendee}
                  className={styles.addGuestIcon}
                  size={38}
                  aria-label="Add guest"
                  title="Add guest"
                />
              </div>
            </Form.Group>

            {fields.length > 0 && (
              <Form.Group className={styles.formSection}>
                <Form.Label className={styles.guestsLabel}>
                  {fields.length} {fields.length === 1 ? 'Guest' : 'Guests'}
                </Form.Label>
                <AttendeesList fields={fields} remove={removeAttendee} />
              </Form.Group>
            )}

            <Form.Group className={styles.formSection} controlId="formNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Add additional notes or description"
                {...register('description')}
              />
            </Form.Group>

            <div className={styles.buttonGroup}>
              <Button className={styles.cancelButton} onClick={closeEventForm}>
                Cancel
              </Button>
              <Button type="submit" className={styles.submitButton}>
                Create Event
              </Button>
            </div>
          </Form>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default CalendarEventViewForm;
