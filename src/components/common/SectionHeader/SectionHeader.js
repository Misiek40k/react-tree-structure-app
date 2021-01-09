import PropTypes from 'prop-types';

import styles from './SectionHeader.module.scss';

const SectionHeader = ({title}) => (
  <h1 className={styles.header}>
    {title}
  </h1>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionHeader;
