import PropTypes from 'prop-types';

import styles from './Condition.module.scss';

const Condition = ({ variant = '', name, clickAction, nodeId }) => (
  <button
    className={styles.component + variant.split(' ')
      .map(name => ' ' + (styles[name] || name)).join('')}
    onClick={() => clickAction(nodeId)}>
    {name}
  </button>
);


Condition.propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
  clickAction: PropTypes.func,
  nodeId: PropTypes.string,
};

export default Condition;
