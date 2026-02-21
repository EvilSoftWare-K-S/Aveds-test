import { Outlet } from 'react-router-dom'; 
import { ModalManager } from '@app/providers/ModalManager'; 
import { Header } from '@widgets/header';
import styles from './LayoutMain.module.scss';

const LayoutMain = () => {
  return (
    <div className={styles.layoutmain}>
      <Header />
      <main className={styles.layoutmain_main}>
        <Outlet />
        <ModalManager />
      </main>
    </div>
  );
};

export default LayoutMain;
