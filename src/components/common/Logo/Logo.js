import { settings } from '../../../data/dataStore';
import Icon from '../Icon/Icon';

import styles from './Logo.module.scss';

const Logo = () => {
  const logo = settings.logo;

  return (
    <div className={styles.component}>
      {logo.txt.split('').map((value, index) => (
        <span className={styles.item} key={index}>{value}</span>
      ))}
      <span className={styles.item}><Icon name={logo.icon} /></span>
    </div>
  );
};

export default Logo;
