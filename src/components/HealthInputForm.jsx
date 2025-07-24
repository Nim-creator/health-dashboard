import { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const HealthInputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    heartRate: '',
    bloodPressure: '',
    sleepHours: '',
    oxygenLevel: '',
    weight: '',
    mood: 'neutral'
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="heartRate">
                <Form.Label>Heart Rate (bpm)</Form.Label>
                <Form.Control 
                  type="number" 
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="bloodPressure">
                <Form.Label>Blood Pressure (mmHg)</Form.Label>
                <Form.Control 
                  type="text" 
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  placeholder="120/80"
                />
              </Form.Group>
            </Col>
          </Row>
          
          {/* Add more fields in similar row/col structure */}
          
          <Button variant="primary" type="submit" className="w-100">
            Get Wellness Advice
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default HealthInputForm;

