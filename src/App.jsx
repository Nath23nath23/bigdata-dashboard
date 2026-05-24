import { useEffect, useState } from 'react'
import { supabase } from './supabase'

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

function App() {

  const [data, setData] = useState([])
  const [country, setCountry] = useState('Afghanistan')

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
        data: data.map(item => item.new_deaths_per_1m)
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
              Math.max(
                ...data.map(
                  item => item.new_deaths_per_1m
                )
              ).toFixed(2)
            }
          </p>
        </div>

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

      {/* BAR CHART */}
      <div style={{
        width: '90%',
        maxWidth: '900px',
        margin: '0 auto 40px auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px'
      }}>
        <Bar data={chartData} />
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
        <Line data={chartData} />
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