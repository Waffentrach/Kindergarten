import  { useState } from 'react';
import PropTypes from 'prop-types';

function AttendanceForm({ setAttendanceData, setError }) {
  const [childName, setChildName] = useState('');
  const [date, setDate] = useState('');
  const [group, setGroup] = useState('');
  const [isPresent, setIsPresent] = useState(true);
  const [absenceStartDate, setAbsenceStartDate] = useState('');
  const [absenceEndDate, setAbsenceEndDate] = useState('');
  const [absenceReason, setAbsenceReason] = useState('');
  const [hasMedicalNote, setHasMedicalNote] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!group || (isPresent && !date) || (!isPresent && (!absenceStartDate || !absenceEndDate || !absenceReason)) || !childName) {
      setError('Будь ласка, заповніть всі обов\'язкові поля.');
      return;
    }

    if (!isPresent) {
      const start = new Date(absenceStartDate);
      const end = new Date(absenceEndDate);
      const diffTime = end - start;
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (diffDays > 3 && !hasMedicalNote) {
        setError('Якщо пропуск більше ніж 3 дні, потрібно надати довідку від лікаря.');
        return;
      }
    }

    // Створення нового запису
    const newAttendance = {
      childName,
      group,
      date: isPresent ? date : `${absenceStartDate} - ${absenceEndDate}`,
      isPresent,
      absenceReason,
      hasMedicalNote,
    };

    // Додаємо новий запис в дані
    setAttendanceData((prevData) => [...prevData, newAttendance]);

    // Оновлення форми
    resetForm();
  };

  const resetForm = () => {
    setChildName('');
    setDate('');
    setGroup('');
    setIsPresent(true);
    setAbsenceStartDate('');
    setAbsenceEndDate('');
    setAbsenceReason('');
    setHasMedicalNote(false);
  };

  return (
    <form onSubmit={handleSubmit} className="attendance-form">
      <label>
        ПІБ дитини:
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          required
        />
      </label>

      <label>
        Група:
        <input
          type="text"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          required
        />
      </label>

      <label>
        Присутність:
        <input
          type="checkbox"
          checked={isPresent}
          onChange={(e) => setIsPresent(e.target.checked)}
        />
        Присутня
      </label>

      {isPresent ? (
        <div>
          <label>
            Дата присутності:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>
      ) : (
        <div>
          <label>
            Початок пропуску:
            <input
              type="date"
              value={absenceStartDate}
              onChange={(e) => setAbsenceStartDate(e.target.value)}
              required
            />
          </label>

          <label>
            Кінець пропуску:
            <input
              type="date"
              value={absenceEndDate}
              onChange={(e) => setAbsenceEndDate(e.target.value)}
              required
            />
          </label>

          <label>
            Причина відсутності:
            <input
              type="text"
              value={absenceReason}
              onChange={(e) => setAbsenceReason(e.target.value)}
              required
            />
          </label>

          <label>
            Довідка від лікаря:
            <input
              type="checkbox"
              checked={hasMedicalNote}
              onChange={(e) => setHasMedicalNote(e.target.checked)}
            />
          </label>
        </div>
      )}

      <button type="submit">Додати запис</button>
    </form>
  );
}

// Валідація пропсів
AttendanceForm.propTypes = {
  setAttendanceData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default AttendanceForm;
