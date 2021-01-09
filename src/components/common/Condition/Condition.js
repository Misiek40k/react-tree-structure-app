import PropTypes from 'prop-types';

import styles from './Condition.module.scss';

const Condition = ({ variant = '', name }) => (
  <span
    className={styles.component + variant.split(' ').map(name => ' ' + (styles[name] || name)).join('')}>
    {name}
  </span>
);


Condition.propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

export default Condition;
