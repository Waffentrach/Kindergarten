import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './StatisticsPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement, 
  Title,
  Tooltip,
  Legend
);

function StatisticsPage({ attendanceData }) {
  const [statistics, setStatistics] = useState({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    absentWithReason: 0,
    absentWithoutReason: 0,
  });

  const calculateStatistics = () => {
    let totalDays = attendanceData.length;
    let presentDays = 0;
    let absentDays = 0;
    let absentWithReason = 0;
    let absentWithoutReason = 0;

    attendanceData.forEach(entry => {
      if (entry.isPresent) {
        presentDays++;
      } else {
        absentDays++;
        if (entry.absenceReason) {
          absentWithReason++;
        } else {
          absentWithoutReason++;
        }
      }
    });

    setStatistics({
      totalDays,
      presentDays,
      absentDays,
      absentWithReason,
      absentWithoutReason,
    });
  };

  useEffect(() => {
    calculateStatistics();
  }, [attendanceData]); 

  const chartData = {
    labels: ['Присутні', 'Відсутні'],
    datasets: [
      {
        label: 'Статистика відвідувань',
        data: [statistics.presentDays, statistics.absentDays],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="statistics-page">
      <h2>Статистика відвідувань</h2>
      <div className="statistics-card">
        <h3>Загальна кількість записів: {statistics.totalDays}</h3>
        <p><strong>Присутні:</strong> {statistics.presentDays}</p>
        <p><strong>Відсутні:</strong> {statistics.absentDays}</p>
        <p><strong>Відсутність з причиною:</strong> {statistics.absentWithReason}</p>
        <p><strong>Відсутність без причини:</strong> {statistics.absentWithoutReason}</p>
      </div>
      <div className="chart-placeholder">
        <h3>Графік відвідувань</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
}

StatisticsPage.propTypes = {
  attendanceData: PropTypes.array.isRequired,
};

export default StatisticsPage;
