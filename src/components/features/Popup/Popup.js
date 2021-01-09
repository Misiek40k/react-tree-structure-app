import PropTypes from 'prop-types';
import { settings } from '../../../data/dataStore';

import Title from '../../common/Title/Title';
import Button from '../../common/Button/Button';
import Select from '../../common/Select/Select';

import styles from './Popup.module.scss';


const Popup = ({ editOption, closePop, addItem, addOption, selectOption, setSelectOption, inputValue, setInputValue }) => {
  const data = settings.content;
  const buttons = settings.content.buttons;

  return (
    <div className={styles.component}>
      <Title
        subtitle={!editOption ? data.popup.item : data.popup.option}
      />
      <input
        type='text'
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
        className={styles.input}
      />
      {
        !editOption &&
        <Select
          selectOption={selectOption}
          setSelectOption={setSelectOption}
        />
      }
      <div className={styles.buttons}>
        <Button
          variant={`${buttons.size.medium} ${buttons.variant.success}`}
          name={buttons.icon.plus}
          clickAction={editOption ? addOption : addItem}
          id={editOption}
        />
        <Button
          variant={`${buttons.size.medium} ${buttons.variant.danger}`}
          name={buttons.icon.cancel}
          clickAction={closePop}
        />
      </div>
    </div>
  );
};

Popup.propTypes = {
  editOption: PropTypes.number,
  closePop: PropTypes.func,
  addItem: PropTypes.func,
  addOption: PropTypes.func,
  selectOption: PropTypes.string,
  setSelectOption: PropTypes.func,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
};

export default Popup;
