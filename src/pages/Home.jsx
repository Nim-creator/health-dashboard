import { useState } from 'react'
import { Container, Row, Col, Alert, Card } from 'react-bootstrap'
import HealthInputForm from '../components/HealthInputForm';
 //
import VitalCards from '../components/VitalCards'; // 

import AnalyticsChart from '../components/AnalyticsChart'; // 

import { getWellnessAdvice } from '../services/openaiservices'

const Home = () => {
  const [healthData, setHealthData] = useState(null)
  const [advice, setAdvice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (data) => {
    setLoading(true)
    setError(null)
    try {
      setHealthData(data)
      const aiAdvice = await getWellnessAdvice(data)
      setAdvice(aiAdvice)
    } catch (err) {
      setError('Failed to get wellness advice. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Mock data for the chart
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    heartRates: [72, 75, 70, 68, 71, 69, 73],
    oxygenLevels: [98, 97, 98, 96, 97, 98, 97]
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={8}>
          <VitalCards data={healthData} />
          <AnalyticsChart data={chartData} />
        </Col>
        <Col lg={4}>
          <HealthInputForm onSubmit={handleSubmit} />
          
          {loading && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {advice && (
            <Card className="mt-4">
              <Card.Header className="bg-primary text-white">
                <Card.Title>Your Wellness Advice</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>{advice}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Home

