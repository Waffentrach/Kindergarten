 import PropTypes from 'prop-types';

function FilterForm({ setFilterName, setFilterGroup, setFilterStartDate, setFilterEndDate }) {
  return (
    <div>
      <h2>Фільтри:</h2>
      <form className="filter-form">
        <label>
          Пошук по ПІБ дитини:
          <input
            type="text"
            onChange={(e) => setFilterName(e.target.value)}
          />
        </label>

        <label>
          Пошук по групі:
          <input
            type="text"
            onChange={(e) => setFilterGroup(e.target.value)}
          />
        </label>

        <label>
          Початок періоду:
          <input
            type="date"
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
        </label>

        <label>
          Кінець періоду:
          <input
            type="date"
            onChange={(e) => setFilterEndDate(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
}
FilterForm.propTypes = {
  setFilterName: PropTypes.func.isRequired,
  setFilterGroup: PropTypes.func.isRequired,
  setFilterStartDate: PropTypes.func.isRequired,
  setFilterEndDate: PropTypes.func.isRequired,
};
export default FilterForm;
