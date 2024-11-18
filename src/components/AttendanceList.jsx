import PropTypes from 'prop-types';
function AttendanceList({ attendanceData }) {
  return (
    <div>
      <h2>Пропуски:</h2>
      <ul className="attendance-list">
        {attendanceData.map((entry, index) => (
          <li key={index}>
            <p><strong>ПІБ дитини:</strong> {entry.childName}</p>
            <p><strong>Група:</strong> {entry.group}</p>
            <p><strong>Дата:</strong> {entry.date}</p>
            <p><strong>Присутність:</strong> {entry.isPresent ? 'Присутня' : 'Відсутня'}</p>
            {!entry.isPresent && (
              <div>
                <p><strong>Причина відсутності:</strong> {entry.absenceReason}</p>
                {entry.hasMedicalNote && <p><strong>Є довідка від лікаря.</strong></p>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
AttendanceList.propTypes = {
  attendanceData: PropTypes.array.isRequired,
};
export default AttendanceList;
