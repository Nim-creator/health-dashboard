import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

const VitalCards = ({ data }) => {
  const vitals = [
    {
      title: 'Heart Rate',
      value: `${data?.heartRate || '--'} bpm`,
      variant: 'danger'
    },
    {
      title: 'Blood Pressure',
      value: data?.bloodPressure || '--/--',
      variant: 'warning'
    },
    {
      title: 'Oxygen Level',
      value: data?.oxygenLevel ? `${data.oxygenLevel}%` : '--',
      variant: 'info'
    },
    {
      title: 'Sleep',
      value: data?.sleepHours ? `${data.sleepHours} hrs` : '--',
      variant: 'success'
    }
  ]

  return (
    <Row className="g-4 mb-4">
      {vitals.map((vital, index) => (
        <Col key={index} md={6} lg={3}>
          <Card className={`dashboard-card border-left-${vital.variant} h-100`}>
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <Card.Title className="text-uppercase text-muted mb-0">
                    {vital.title}
                  </Card.Title>
                  <Card.Text className="h2 font-weight-bold mb-0">
                    {vital.value}
                  </Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default VitalCards
