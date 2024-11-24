import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';

const HomePage = ({ attendanceData }) => {
  return (
    <div className="main-content">
      <h1>Контроль відвідування дітей</h1>
      <p className="welcome-message">
        Ласкаво просимо до системи контролю відвідування! Залишайте дані про відвідування та переглядайте історію.
      </p>

      <div className="dashboard">
        <div className="card">
          <h2>Останні записи</h2>
          <ul>
            {attendanceData.length > 0 ? (
              attendanceData.slice(0, 3).map((entry, index) => (
                <li key={index}>
                  <p><strong>Дитина:</strong> {entry.childName}</p>
                  <p><strong>Дата:</strong> {entry.date}</p>
                  <p><strong>Група:</strong> {entry.group}</p>
                </li>
              ))
            ) : (
              <p>Немає записів.</p>
            )}
          </ul>
        </div>

        <div className="card">
          <h2>Статистика відвідувань</h2>
          <p>Тут буде статистика по відвідуваності, графіки та інша корисна інформація.</p>
          <Link to="/statistics">
            <button>Перейти до статистики</button>
          </Link>
        </div>
      </div>

      <div className="quick-links">
        <div className="link-card">
          <h3>Відвідування</h3>
          <Link to="/attendance">
            <button>Додати відвідування</button>
          </Link>
        </div>
        <div className="link-card">
          <h3>Історія відвідувань</h3>
          <Link to="/history">
            <button>Переглянути історію</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  attendanceData: PropTypes.array.isRequired, 
};

export default HomePage;
