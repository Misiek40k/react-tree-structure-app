import { Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './Title.module.scss';

const Title = ({ title, subtitle }) => (
  <Fragment>
    {title && <h1 className={styles.title}>{title}</h1>}
    {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
  </Fragment>

);

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Title;
