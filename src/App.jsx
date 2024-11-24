import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AttendanceForm from './components/AttendanceForm';
import HistoryPage from './pages/HistoryPage';
import StatisticsPage from './pages/StatisticsPage';
import HomePage from './pages/HomePage';
import Navbar from './navigation/Navbar';
import './assets/App.css';

function App() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [editingData, setEditingData] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [error, setError] = useState('');  

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage attendanceData={attendanceData} />} />
          <Route path="/attendance" element={
            <AttendanceForm 
              setAttendanceData={setAttendanceData} 
              setError={setError} 
              setIsEditing={setIsEditing} 
              setEditingData={setEditingData}
              editingData={editingData}
              isEditing={isEditing} 
              attendanceData={attendanceData} 
            />
          } />
          <Route path="/history" element={
            <HistoryPage 
              attendanceData={attendanceData}
  setAttendanceData={setAttendanceData}
  setEditingData={setEditingData}
  setIsEditing={setIsEditing}
            />
          } />
          
          <Route path="/statistics" element={<StatisticsPage attendanceData={attendanceData} />} />

        </Routes>
        {error && <div className="error-message">{error}</div>} 
      </div>
    </Router>
  );
}

export default App;
