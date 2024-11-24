import PropTypes from 'prop-types';
import './AttendanceList.css';

function AttendanceList({ attendanceData }) {
  return (
    <div>
      <h2>Список відвідувань</h2>
      {attendanceData.length === 0 ? (
        <p>Немає записів.</p>
      ) : (
        <ul className="attendance-list">
          {attendanceData.map((entry, index) => (
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

AttendanceList.propTypes = {
  attendanceData: PropTypes.array.isRequired,
};

export default AttendanceList;
