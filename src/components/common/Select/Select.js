import PropTypes from 'prop-types';
import { settings } from '../../../data/dataStore';

import styles from './Select.module.scss';

const Select = ({ selectOption, setSelectOption }) => {
  const data = settings.content.select;

  return (
    <div className={styles.component}>
      <label >
        {data.label}
        <select value={selectOption} onChange={event => setSelectOption(event.target.value)}>
          <option value={data.variant.medium}>{data.txt.medium}</option>
          <option value={data.variant.large}>{data.txt.large}</option>
        </select>
      </label>
    </div>
  );
};

Select.propTypes = {
  selectOption: PropTypes.string,
  setSelectOption: PropTypes.func,
};

export default Select;
