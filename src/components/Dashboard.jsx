import { Container, Row, Col } from 'react-bootstrap';
import HealthInputForm from './HealthInputForm';
import VitalCards from './VitalCards';

const Dashboard = () => {
  const handleSubmit = async (healthData) => {
    // Process data and call OpenAI API
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={8}>
          <VitalCards />
          {/* AnalyticsChart would go here */}
        </Col>
        <Col lg={4}>
          <HealthInputForm onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
