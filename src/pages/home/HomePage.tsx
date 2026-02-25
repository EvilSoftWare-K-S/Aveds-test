import { Button } from '@shared/ui/button';
import style from './HomePage.module.scss';
import { ADBLOCK } from './lib/const';
import { PATHS } from '@shared/routes/routes';
import { useNavigate } from 'react-router-dom';
import { ButtonSignIn } from '@features/button-signin-logout/ButtonSignIn';
import { TitleBlock } from '@features/title-block/TitleBlock';

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
      <section className={style.home_adblock}>
        {ADBLOCK.map((item) => {
          return (
            <div key={item.href + item.text + item.title} className={style.home_adblock_card}>
              <div className={style.home_adblock_card_logo}>
                <svg className={style.home_adblock_card_logo_wrap} onClick={() => {}}>
                  <use className={style.home_adblock_card_logo_wrap_svg} href={item.href} />
                </svg>
              </div>
              <h2 className={style.home_adblock_card_title}>{item.title}</h2>
              <hr className={style.home_adblock_card_hr} />
              <span className={style.home_adblock_card_text}>{item.text}</span>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default HomePage;
