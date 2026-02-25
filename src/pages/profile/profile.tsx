import { Button } from '@shared/ui/button';
import style from './profile.module.scss';
import { ButtonSignIn } from '@features/button-signin-logout/ButtonSignIn';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@shared/routes/routes';
import { useCachedProfile } from '@features/button-signin-logout/model/useCachedProfile';
import { TitleBlock } from '@features/title-block/TitleBlock';

const ProfilePage = () => {
  const { data } = useCachedProfile();
  const navigate = useNavigate();
  const handleGoToContact = () => {
    navigate(PATHS.contact);
  };

  return (
    <div className={style.profile}>
      <TitleBlock textTitle={`Привет, ${data?.user?.name}`}>
        <ButtonSignIn theme='primary' size='xl' textIn='' textOut='Выйти из аккаута' />
        <Button onClick={handleGoToContact} theme='secondary' size='xl'>
          Перейти в контакты
        </Button>
      </TitleBlock>
    </div>
  );
};

export default ProfilePage;
