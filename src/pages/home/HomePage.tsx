import { Button } from '@shared/ui/button';
import style from './HomePage.module.scss';
import { ADBLOCK } from './lib/const';
import { PATHS } from '@shared/routes/routes';
import { useNavigate } from 'react-router-dom';
import { ButtonSignIn } from '@features/button-signin-logout/ButtonSignIn';
import { TitleBlock } from '@features/title-block/TitleBlock';
import { AdBlockCards } from '@features/ad-block-cards';

const HomePage = () => {
  const navigate = useNavigate();
  const handleGoToContact = () => {
    navigate(PATHS.contact);
  };
  return (
    <div className={style.home}>
      <TitleBlock textTitle={'Место для получения медицинской помощи'}>
        <ButtonSignIn theme='primary' size='xl' textIn='Войти' textOut='Выйти' />
        <Button onClick={handleGoToContact} theme='secondary' size='xl'>
          Контакты
        </Button>
      </TitleBlock>
      <AdBlockCards items={ADBLOCK} />
    </div>
  );
};

export default HomePage;
