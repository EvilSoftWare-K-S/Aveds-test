import { Button } from '@shared/ui/button';
import style from './Header.module.scss';

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.header_wrap}>
        <svg className={style.header_wrap_logo} onClick={() => {}}>
          <use href={'src/shared/ui/assets/header/logo.svg'} />
        </svg>
        <nav className={style.header_wrap_nav}>
          <Button theme='opacity' size='xs'>
            Контакты
          </Button>
          <Button theme='secondary' size='lg'>
            Войти
          </Button>
        </nav>
      </div>
    </header>
  );
};
