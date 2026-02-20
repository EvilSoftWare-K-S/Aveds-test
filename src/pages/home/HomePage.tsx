import { Button } from '@shared/ui/button';
import style from './HomePage.module.scss';
import { ADBLOCK } from './lib/const';
import { PATHS } from '@shared/routes/routes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '@app/providers/model/ModalProvider';

const HomePage = () => {
  const navigate = useNavigate();
  const handleGoToContact = () => {
    navigate(PATHS.contact);
  };
  const dispatch = useDispatch();
  const handleOpenSignInModal = () => {
    dispatch(openModal('sign-in'));
  };
  return (
    <div className={style.home}>
      <section className={style.home_wrap}>
        <h1 className={style.home_wrap_title}>Место для получения медицинской помощи</h1>
        <div className={style.home_wrap_buttonPanel}>
          <Button onClick={handleOpenSignInModal} theme='primary' size='xl'>
            Войти
          </Button>
          <Button onClick={handleGoToContact} theme='secondary' size='xl'>
            Контакты
          </Button>
        </div>
      </section>
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
