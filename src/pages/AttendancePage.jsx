import { useState, useEffect } from 'react';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceList from '../components/AttendanceList'; 
import { useNavigate } from 'react-router-dom';

function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('attendanceData');
    if (storedData) {
      setAttendanceData(JSON.parse(storedData));
    }
  }, []); 

  useEffect(() => {
    if (attendanceData.length > 0) {
      localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    }
  }, [attendanceData]); 

  const handleSubmit = (newAttendance) => {
    setAttendanceData((prevData) => {
      const updatedData = [...prevData, newAttendance];
      return updatedData;
    });
    navigate(`/attendance/${newAttendance.childName}`);
  };

  return (
    <div className="attendance-page">
      <h1>Контроль відвідування дітей</h1>
      {error && <div className="error-message">{error}</div>}
      <AttendanceForm setAttendanceData={setAttendanceData} setError={setError} onSubmit={handleSubmit} />
      <h2>Список відвідувань</h2>
      <AttendanceList attendanceData={attendanceData} />
    </div>
  );
}

export default AttendancePage;
