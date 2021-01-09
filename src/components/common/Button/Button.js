import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

import styles from './Button.module.scss';

const Button = ({ variant = '', name, clickAction, id, option }) => (
  <button
    className={styles.component + variant.split(' ').map(name => ' ' + (styles[name] || name)).join('')}
    onClick={() => clickAction(id, option)}
  >
    <Icon name={name} />
  </button>
);

Button.propTypes = {
  variant: PropTypes.string,
  name: PropTypes.string,
  clickAction: PropTypes.func,
  id: PropTypes.number,
  option: PropTypes.any,
};

export default Button;
