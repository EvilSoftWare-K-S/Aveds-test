import { TitleBlock } from '@features/title-block/TitleBlock';
import style from './ContactPage.module.scss';
const ContactPage = () => {
  return (
    <div className={style.contact}>
      <TitleBlock textTitle='Контакты'/>
    </div>
  );
};

export default ContactPage;
