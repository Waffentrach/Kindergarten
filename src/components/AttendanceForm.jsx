import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './AttendanceForm.css';

function AttendanceForm({
  setAttendanceData,
  setError,
  editingData,
  setIsEditing,
  isEditing,
  attendanceData,
  setEditingData
}) {
   const [childName, setChildName] = useState(editingData?.childName || ''); // ініціалізація значення
  const [date, setDate] = useState(editingData?.date || ''); // ініціалізація значення
  const [group, setGroup] = useState(editingData?.group || ''); // ініціалізація значення
  const [isPresent, setIsPresent] = useState(editingData?.isPresent ?? true); // ініціалізація значення
  const [absenceStartDate, setAbsenceStartDate] = useState(editingData?.absenceStartDate || '');
  const [absenceEndDate, setAbsenceEndDate] = useState(editingData?.absenceEndDate || '');
  const [absenceReason, setAbsenceReason] = useState(editingData?.absenceReason || '');
  const [hasMedicalNote, setHasMedicalNote] = useState(editingData?.hasMedicalNote ?? false);
  const [medicalNoteFile, setMedicalNoteFile] = useState(editingData?.medicalNoteFile || null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('attendanceData');
    if (storedData) {
      setAttendanceData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (editingData) {
      setChildName(editingData.childName);
      setDate(editingData.date);
      setGroup(editingData.group);
      setIsPresent(editingData.isPresent);
      setAbsenceStartDate(editingData.absenceStartDate);
      setAbsenceEndDate(editingData.absenceEndDate);
      setAbsenceReason(editingData.absenceReason);
      setHasMedicalNote(editingData.hasMedicalNote);
      setMedicalNoteFile(editingData.medicalNoteFile);
    }
  }, [editingData]);

  const resetForm = () => {
    setChildName('');
    setDate('');
    setGroup('');
    setIsPresent(true);
    setAbsenceStartDate('');
    setAbsenceEndDate('');
    setAbsenceReason('');
    setHasMedicalNote(false);
    setMedicalNoteFile(null);
  };

  const saveDataToLocalStorage = (newData) => {
    const updatedData = [...attendanceData, newData];
    localStorage.setItem('attendanceData', JSON.stringify(updatedData)); 
    setAttendanceData(updatedData);
  };

  // Перевірка форми
  const validateForm = () => {
    // Перевірка наявності обов'язкових полів
    if (!childName || !group) {
      setError('Будь ласка, заповніть всі обов\'язкові поля.');
      return false;
    }

    // Перевірка правильності ПІБ
    const nameRegex = /^[A-ZА-Я][a-zа-яёіїєґ'`-]+( [A-ZА-Я][a-zа-яёіїєґ'`-]+){1,2}$/;
    if (!nameRegex.test(childName)) {
      setError('Невірний формат ПІБ. Використовуйте лише літери і пробіли.');
      return false;
    }

    // Перевірка на групу
    const groupRegex = /^[A-Za-z0-9А-Яа-яЇїЄєІіҐґ]+$/;
    if (!groupRegex.test(group)) {
      setError('Група має містити тільки літери та цифри.');
      return false;
    }

    if (isPresent && !date) {
      setError('Будь ласка, вкажіть дату присутності.');
      return false;
    }

    if (!isPresent && (!absenceStartDate || !absenceEndDate || !absenceReason)) {
      setError('Будь ласка, заповніть всі поля для відсутності.');
      return false;
    }

    // Перевірка на довідку, якщо відсутність більше ніж 3 дні
    if (!isPresent) {
      const absenceDuration = Math.ceil((new Date(absenceEndDate) - new Date(absenceStartDate)) / (1000 * 60 * 60 * 24));
      if (absenceDuration > 3 && !hasMedicalNote) {
        setError('Якщо відсутність більше ніж 3 дні, потрібна довідка від лікаря.');
        return false;
      }
    }

    // Якщо є медична довідка, перевірка на наявність файлу
    if (hasMedicalNote && !medicalNoteFile) {
      setError('Будь ласка, прикріпіть довідку від лікаря.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newAttendance = {
      childName,
      group,
      date: isPresent ? date : `${absenceStartDate} - ${absenceEndDate}`,
      isPresent,
      absenceReason,
      hasMedicalNote,
      medicalNoteFile,
    };

    // Якщо редагування, оновлюємо запис
    if (isEditing) {
      const updatedData = attendanceData.map(entry =>
        entry.childName === editingData.childName ? newAttendance : entry
      );
      setAttendanceData(updatedData);
      localStorage.setItem('attendanceData', JSON.stringify(updatedData));
    } else {
      saveDataToLocalStorage(newAttendance);
    }

    resetForm();
    setIsEditing(false);
    setEditingData(null);
    navigate('/attendance');
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

          {hasMedicalNote && (
            <div>
              <label>
                Прикріпіть довідку від лікаря (PDF, зображення):
                <input
                  type="file"
                  accept="application/pdf, image/*"
                  onChange={(e) => setMedicalNoteFile(e.target.files[0])}
                />
              </label>
            </div>
          )}
        </div>
      )}

      <button type="submit">{isEditing ? 'Зберегти зміни' : 'Додати запис'}</button>
    </form>
  );
}

AttendanceForm.propTypes = {
  attendanceData: PropTypes.array.isRequired,
  setAttendanceData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setEditingData: PropTypes.func.isRequired,
  editingData: PropTypes.object,
  isEditing: PropTypes.bool.isRequired,
};

export default AttendanceForm;
