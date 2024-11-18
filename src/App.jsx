import { useState } from 'react';
import './assets/App.css';
import AttendanceForm from './components/AttendanceForm';
import AttendanceList from './components/AttendanceList';

function App() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState('');

  return (
    <div className="app-container">
      <h1>Контроль відвідування дітей</h1>
      
      {error && <div className="error-message">{error}</div>}

      <AttendanceForm setAttendanceData={setAttendanceData} setError={setError} />
      <AttendanceList attendanceData={attendanceData} />
    </div>
  );
}

export default App;
