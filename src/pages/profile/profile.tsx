import { Button } from '@shared/ui/button';
import style from './profile.module.scss';
import { ButtonSignIn } from '@features/button-signin-logout/ButtonSignIn';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@shared/routes/routes';
import { useCachedProfile } from '@features/button-signin-logout/model/useCachedProfile';

const ProfilePage = () => {
  const { data } = useCachedProfile();
  const navigate = useNavigate();
  const handleGoToContact = () => {
    navigate(PATHS.contact);
  };

  return (
    <div className={style.profile}>
      <section className={style.profile_wrap}>
        <h1 className={style.profile_wrap_title}>Привет, {data?.user?.name}</h1>
        <div className={style.profile_wrap_buttonPanel}>
          <ButtonSignIn theme='primary' size='xl' textIn='' textOut='Выйти из аккаута' />
          <Button onClick={handleGoToContact} theme='secondary' size='xl'>
            Перейти в контакты
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
