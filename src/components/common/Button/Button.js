import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

import styles from './Button.module.scss';

const Button = ({ variant = '', name, clickAction, nodeId }) => (
  <button
    className={styles.component + variant.split(' ').map(name => ' ' + (styles[name] || name)).join('')}
    onClick={() => clickAction(nodeId)}
  >
    <Icon name={name} />
  </button>
);

Button.propTypes = {
  variant: PropTypes.string,
  name: PropTypes.string,
  clickAction: PropTypes.func,
  nodeId: PropTypes.string,
};

export default Button;
