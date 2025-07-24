import { useEffect, useRef } from 'react'
import { Card } from 'react-bootstrap'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const AnalyticsChart = ({ data }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Heart Rate',
              data: data.heartRates,
              borderColor: '#e74a3b',
              tension: 0.1
            },
            {
              label: 'Oxygen Level',
              data: data.oxygenLevels,
              borderColor: '#36b9cc',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Health Trends</Card.Title>
        <div style={{ height: '300px' }}>
          <canvas ref={chartRef} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default AnalyticsChart
