import { useEffect, useState } from 'react'
import { supabase } from './supabase'

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

import { Bar, Line, Pie } from 'react-chartjs-2'

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

function App() {

  const [data, setData] = useState([])
  const [country, setCountry] = useState('Afghanistan')
  const [insight, setInsight] = useState('')

  useEffect(() => {
    fetchData()
  }, [country])

  async function fetchData() {

    const { data, error } = await supabase
      .from('covid_data')
      .select('*')
      .eq('entity', country)
      .range(200, 220)

    if (error) {
      console.log(error)
    } else {
      setData(data)
    }
  }

  const chartData = {
    labels: data.map(item => item.day),

    datasets: [
      {
        label: 'Deaths per 1M',

        data: data.map(
          item => item.new_deaths_per_1m
        ),

        backgroundColor: '#3b82f6',
        borderColor: '#1d4ed8'
      }
    ]
  }

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial',
      backgroundColor: '#0f172a',
      minHeight: '100vh',
      color: 'white'
    }}>

      <h1 style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Big Data Dashboard
      </h1>

      {/* FILTER */}
      <div style={{
        marginBottom: '20px',
        textAlign: 'center'
      }}>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        >
          <option>Afghanistan</option>
          <option>Philippines</option>
          <option>Japan</option>
          <option>United States</option>
        </select>

      </div>

      {/* KPI CARDS */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>

        {/* TOTAL RECORDS */}
        <div style={{
          border: '1px solid gray',
          padding: '20px',
          borderRadius: '10px',
          width: '220px',
          backgroundColor: '#1e293b',
          textAlign: 'center'
        }}>

          <h2>Total Records</h2>

          <p style={{ fontSize: '28px' }}>
            {data.length}
          </p>

        </div>

        {/* HIGHEST RATE */}
        <div style={{
          border: '1px solid gray',
          padding: '20px',
          borderRadius: '10px',
          width: '220px',
          backgroundColor: '#1e293b',
          textAlign: 'center'
        }}>

          <h2>Highest Death Rate</h2>

          <p style={{ fontSize: '28px' }}>
            {
              data.length > 0
                ? Math.max(
                    ...data.map(
                      item => item.new_deaths_per_1m || 0
                    )
                  ).toFixed(2)
                : 0
            }
          </p>

        </div>

        {/* COUNTRY */}
        <div style={{
          border: '1px solid gray',
          padding: '20px',
          borderRadius: '10px',
          width: '220px',
          backgroundColor: '#1e293b',
          textAlign: 'center'
        }}>

          <h2>Selected Country</h2>

          <p style={{ fontSize: '24px' }}>
            {country}
          </p>

        </div>

      </div>

      {/* AI BUTTON */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>

        <button
          onClick={async () => {

            try {

              if (data.length === 0) {

                setInsight(
                  'No data available for analysis.'
                )

                return
              }

              const highest =
                Math.max(
                  ...data.map(
                    item => item.new_deaths_per_1m || 0
                  )
                ).toFixed(2)

              const average =
                (
                  data.reduce(
                    (sum, item) =>
                      sum + (item.new_deaths_per_1m || 0),
                    0
                  ) / data.length
                ).toFixed(2)

              setInsight(`
COVID analysis for ${country}:

• Highest death rate recorded:
${highest}

• Average deaths per 1M:
${average}

• Trend Insight:
The dataset shows varying COVID
death trends over time, indicating
changes in outbreak severity and
public health response effectiveness.
`)

            } catch (error) {

              console.log(error)

              setInsight(
                'AI insight failed to load.'
              )
            }

          }}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Generate AI Insight
        </button>

      </div>

      {/* AI OUTPUT */}
      <div style={{
        backgroundColor: '#1e293b',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px'
      }}>

        <h2>AI Insight</h2>

        <p style={{
          whiteSpace: 'pre-line'
        }}>
          {insight}
        </p>

      </div>

      {/* BAR CHART */}
      <div style={{
        width: '90%',
        maxWidth: '900px',
        margin: '0 auto 40px auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px'
      }}>

        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true
          }}
        />

      </div>

      {/* LINE CHART */}
      <div style={{
        width: '90%',
        maxWidth: '900px',
        margin: '0 auto 40px auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px'
      }}>

        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true
          }}
        />

      </div>

      {/* PIE CHART */}
      <div style={{
        width: '90%',
        maxWidth: '500px',
        margin: '0 auto 40px auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px'
      }}>

        <Pie
          data={{
            labels: [
              'Low',
              'Medium',
              'High'
            ],

            datasets: [
              {
                label: 'Deaths per 1M',

                data: [

                  data.filter(
                    item =>
                      item.new_deaths_per_1m < 1
                  ).length,

                  data.filter(
                    item =>
                      item.new_deaths_per_1m >= 1 &&
                      item.new_deaths_per_1m < 5
                  ).length,

                  data.filter(
                    item =>
                      item.new_deaths_per_1m >= 5
                  ).length
                ],

                backgroundColor: [
                  '#22c55e',
                  '#eab308',
                  '#ef4444'
                ],

                borderColor: [
                  '#15803d',
                  '#a16207',
                  '#b91c1c'
                ],

                borderWidth: 1
              }
            ]
          }}

          options={{
            responsive: true,
            maintainAspectRatio: true
          }}
        />

      </div>

      {/* TABLE */}
      <div style={{
        overflowX: 'auto'
      }}>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: '100%',
            backgroundColor: 'white',
            color: 'black'
          }}
        >

          <thead>

            <tr>
              <th>Entity</th>
              <th>Code</th>
              <th>Day</th>
              <th>Deaths per 1M</th>
            </tr>

          </thead>

          <tbody>

            {data.map((item) => (

              <tr key={item.id}>
                <td>{item.entity}</td>
                <td>{item.code}</td>
                <td>{item.day}</td>
                <td>{item.new_deaths_per_1m}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default App