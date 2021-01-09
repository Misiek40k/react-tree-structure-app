import { settings } from '../../../data/dataStore';

import Logo from '../../common/Logo/Logo';
import Title from '../../common/Title/Title';

import styles from './Header.module.scss';


const Header = () => (
  <header className={styles.component}>
    <Logo />
    <Title title={settings.header.title} />
  </header>
);

export default Header;
