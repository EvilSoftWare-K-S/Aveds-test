import { Button } from '@shared/ui/button';
import style from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@shared/routes/routes';
import { ButtonSignIn } from '@features/button-signin-logout/ButtonSignIn';

export const Header = () => {
  const navigate = useNavigate();
  const HandleGoToContact = () => {
    navigate(PATHS.contact);
  };
  const goToHome = () => {
    navigate(PATHS.home);
  };
  return (
    <header className={style.header}>
      <div className={style.header_wrap}>
        <Button theme='none' size='auto' onClick={goToHome}>
          <svg className={style.header_wrap_logo}>
            <use href={'src/shared/ui/assets/header/logo.svg'} />
          </svg>
        </Button>
        <nav className={style.header_wrap_nav}>
          <Button onClick={HandleGoToContact} theme='opacity' size='xs'>
            Контакты
          </Button>
          <ButtonSignIn />
        </nav>
      </div>
    </header>
  );
};
