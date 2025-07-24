import { Table, Card } from 'react-bootstrap'

const History = () => {
  // Mock data - replace with real API call
  const historyData = [
    { date: '2023-05-01', heartRate: 72, bp: '120/80', oxygen: 98, sleep: 7.5 },
    { date: '2023-05-02', heartRate: 75, bp: '122/82', oxygen: 97, sleep: 6.8 },
    { date: '2023-05-03', heartRate: 71, bp: '118/78', oxygen: 98, sleep: 7.2 }
  ]

  return (
    <Card>
      <Card.Header>
        <Card.Title>Health History</Card.Title>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Heart Rate</th>
              <th>Blood Pressure</th>
              <th>Oxygen %</th>
              <th>Sleep (hrs)</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.heartRate} bpm</td>
                <td>{entry.bp}</td>
                <td>{entry.oxygen}%</td>
                <td>{entry.sleep}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default History
