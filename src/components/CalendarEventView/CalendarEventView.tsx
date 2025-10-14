import React, { FC, useState } from 'react';
import styles from './CalendarEventView.module.scss';

import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

import { CalendarEvent } from '../../../server/src/types/index';

interface IProps {
  listName: string;
  closeEventForm: () => void;
  show: boolean;
  apiCall: (eventData: CalendarEvent) => Promise<void>;
}

const CalendarEventView: FC<IProps> = ({ listName, show, closeEventForm, apiCall }) => {
  const [formData, setFormData] = useState({
    summary: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    description: '',
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const mapToCalendarEventPayload = (formData: any): CalendarEvent => {
    return {
      summary: formData.summary,
      location: formData.location,
      description: formData.description,
      start: {
        dateTime: `${formData.startDate}T${formData.startTime}:00`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: `${formData.endDate}T${formData.endTime}:00`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const calendarEventPayload = mapToCalendarEventPayload(formData);
    await apiCall?.(calendarEventPayload);
  };

  return (
    <div className={styles.calendarEventView}>
      <Modal show={show} backdrop="static">
        <Modal.Header closeButton className="my-3" onClick={closeEventForm}>
          <Modal.Title>{listName ?? 'New event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Control
                type="text"
                value={formData.summary}
                placeholder="Title"
                name="summary"
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Control
                type="text"
                value={formData.location}
                placeholder="Location"
                name="location"
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formStartDate">
              <Form.Label column sm={2}>
                Start
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  value={formData.startDate}
                  name="startDate"
                  className="mb-3 mb-sm-0"
                  onChange={handleFormChange}
                  required
                />
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="time"
                  value={formData.startTime}
                  name="startTime"
                  onChange={handleFormChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formEndDate">
              <Form.Label column sm={2}>
                End
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  value={formData.endDate}
                  name="endDate"
                  className="mb-3 mb-sm-0"
                  onChange={handleFormChange}
                  required
                />
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="time"
                  value={formData.endTime}
                  name="endTime"
                  onChange={handleFormChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                value={formData.description}
                name="description"
                rows={3}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3 modal-footer" controlId="formButtons">
              <Col sm={2}>
                <Button variant="outline-secondary" onClick={closeEventForm}>
                  Close
                </Button>
              </Col>

              <Col sm={2}>
                <Button type="submit" variant="outline-warning">
                  Add
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CalendarEventView;
