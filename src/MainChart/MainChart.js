import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function MainChart({ data }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {
      const formattedData = {
        labels: data.map(item => item.title),
        datasets: [{
          data: data.map(item => item.budget),
          backgroundColor: [
            '#ffcd56', '#ff6384', '#36a2eb', '#fd6b19',
            '#8e44ad', '#2ecc71', '#e67e22', '#3498db'
          ],
        }]
      };
      setChartData(formattedData);
    }
  }, [data]); 

  return (
    <div className="chart-container"
    style={{ maxWidth: '400px', margin: '40px auto' }}>
      {chartData ? <Pie data={chartData} /> : <p>Loading data...</p>}
    </div>
  );
}

export default MainChart;