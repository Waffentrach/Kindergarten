import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; 
import './HistoryPage.css';

function HistoryPage({ attendanceData, setEditingData, setIsEditing, setAttendanceData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const navigate = useNavigate(); 
  const filteredData = attendanceData.filter(entry => {
  const matchesChildName = entry.childName.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesGroup = entry.group.toLowerCase().includes(groupFilter.toLowerCase());
    return matchesChildName && matchesGroup;
  });

  const handleEdit = (entry) => {
    setEditingData(entry);  
    setIsEditing(true);  
    navigate('/attendance');
  };
  const handleDelete = (index) => {
    const updatedData = attendanceData.filter((_, i) => i !== index);
    setAttendanceData(updatedData); 
    localStorage.setItem('attendanceData', JSON.stringify(updatedData));
  };

  return (
    <div className="history-page">
      <h2>Історія відвідувань</h2>

      <form className="search-form">
        <label>
          Пошук по імені дитини:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Введіть ім'я дитини"
          />
        </label>

        <label>
          Пошук по групі:
          <input
            type="text"
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            placeholder="Введіть групу"
          />
        </label>
      </form>

      {filteredData.length > 0 ? (
        <ul className="attendance-list">
          {filteredData.map((entry, index) => (
            <li key={index}>
              <p><strong>ПІБ дитини:</strong> {entry.childName}</p>
              <p><strong>Дата:</strong> {entry.date}</p>
              <p><strong>Група:</strong> {entry.group}</p>
              <p><strong>Присутність:</strong> {entry.isPresent ? 'Присутня' : 'Відсутня'}</p>
              {!entry.isPresent && (
                <div className="absence-details">
                  <p><strong>Причина відсутності:</strong> {entry.absenceReason}</p>
                  {entry.hasMedicalNote && <p><strong>Є довідка від лікаря.</strong></p>}
                </div>
              )}
              <button onClick={() => handleEdit(entry)} className="edit-button">Редагувати</button>
              <button onClick={() => handleDelete(index)} className="delete-button">Видалити</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-history-message">Історія відвідувань для цієї дитини пуста або не знайдено за вказаними параметрами.</p>
      )}
    </div>
  );
}

HistoryPage.propTypes = {
  attendanceData: PropTypes.array.isRequired,
  setEditingData: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setAttendanceData: PropTypes.func.isRequired, 
};

export default HistoryPage;
