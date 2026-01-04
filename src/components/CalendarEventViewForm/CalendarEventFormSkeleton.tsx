import React, { FC } from 'react';
import { Form, Row, Col, Modal, Placeholder } from 'react-bootstrap';

const CalendarEventFormSkeleton: FC = () => {
  return (
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formTitle">
          <Placeholder animation="glow">
            <Placeholder xs={12} style={{ height: '38px', borderRadius: '0.375rem' }} />
          </Placeholder>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocation">
          <Placeholder animation="glow">
            <Placeholder xs={12} style={{ height: '38px', borderRadius: '0.375rem' }} />
          </Placeholder>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formStartDate">
          <Form.Label column sm={2}>
            <Placeholder animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
          </Form.Label>
          <Col sm={5}>
            <Placeholder animation="glow" className="mb-3 mb-sm-0">
              <Placeholder xs={12} style={{ height: '38px', borderRadius: '0.375rem' }} />
            </Placeholder>
          </Col>
          <Col sm={5}>
            <Placeholder animation="glow">
              <Placeholder xs={12} style={{ height: '38px', borderRadius: '0.375rem' }} />
            </Placeholder>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formEndDate">
          <Form.Label column sm={2}>
            <Placeholder animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </Form.Label>
          <Col sm={5}>
            <Placeholder animation="glow" className="mb-3 mb-sm-0">
              <Placeholder xs={12} style={{ height: '38px', borderRadius: '0.375rem' }} />
            </Placeholder>
          </Col>
          <Col sm={5}>
            <Placeholder animation="glow">
              <Placeholder xs={12} style={{ height: '38px', borderRadius: '0.375rem' }} />
            </Placeholder>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNotes">
          <Form.Label>
            <Placeholder animation="glow">
              <Placeholder xs={2} />
            </Placeholder>
          </Form.Label>
          <Placeholder animation="glow">
            <Placeholder xs={12} style={{ height: '76px', borderRadius: '0.375rem' }} />
          </Placeholder>
        </Form.Group>

        <Form.Group className="mb-3 modal-footer" controlId="formButtons">
          <Col sm={2}>
            <Placeholder animation="glow">
              <Placeholder xs={12} style={{ height: '30px', borderRadius: '0.375rem' }} />
            </Placeholder>
          </Col>
          <Col sm={2}>
            <Placeholder animation="glow">
              <Placeholder xs={12} style={{ height: '30px', borderRadius: '0.375rem' }} />
            </Placeholder>
          </Col>
        </Form.Group>
      </Form>
    </Modal.Body>
  );
};

export default CalendarEventFormSkeleton;
