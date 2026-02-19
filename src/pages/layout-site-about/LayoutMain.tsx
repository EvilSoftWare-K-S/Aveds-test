import { Outlet } from 'react-router-dom'; 
import { ModalManager } from '@app/providers/ModalManager'; 
// import { Header } from '@widgets/header/Header';
import styles from './LayoutMain.module.scss';

const LayoutMain = () => {
  return (
    <div >
      {/* <Header /> */}
      <main className={styles.main}>
        <Outlet />
        <ModalManager />
      </main>
    </div>
  );
};

export default LayoutMain;
