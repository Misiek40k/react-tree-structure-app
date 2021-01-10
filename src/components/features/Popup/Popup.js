import PropTypes from 'prop-types';
import { settings } from '../../../data/dataStore';

import Title from '../../common/Title/Title';
import Button from '../../common/Button/Button';
import Select from '../../common/Select/Select';

import styles from './Popup.module.scss';


const Popup = ({ closePopup, addDataNode, dataNodeStyleOption,
  setDataNodeStyleOption, popupInputValue, setPopupInputValue, nodeId }) => {
  const data = settings.content;
  const buttons = settings.content.buttons;

  return (
    <div className={styles.component}>
      <Title
        subtitle={data.popup.option}
      />
      <input
        type='text'
        value={popupInputValue}
        onChange={event => setPopupInputValue(event.target.value)}
        className={styles.input}
      />
      {
        <Select
          selectOption={dataNodeStyleOption}
          setSelectOption={setDataNodeStyleOption}
        />
      }
      <div className={styles.buttons}>
        <Button
          variant={`${buttons.size.medium} ${buttons.variant.success}`}
          name={buttons.icon.plus}
          clickAction={addDataNode}
          id={nodeId}
        />
        <Button
          variant={`${buttons.size.medium} ${buttons.variant.danger}`}
          name={buttons.icon.cancel}
          clickAction={closePopup}
        />
      </div>
    </div>
  );
};

Popup.propTypes = {
  closePopup: PropTypes.func,
  addDataNode: PropTypes.func,
  dataNodeStyleOption: PropTypes.string,
  setDataNodeStyleOption: PropTypes.func,
  popupInputValue: PropTypes.string,
  setPopupInputValue: PropTypes.func,
  nodeId: PropTypes. string,
};

export default Popup;
