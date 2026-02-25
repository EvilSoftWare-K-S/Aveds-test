import { TAdBlockCards } from '../types/AdBlockCardsType';
import style from './AdBlockCards.module.scss';

export const AdBlockCards: React.FC<TAdBlockCards> = ({ items }) => {
  return (
    <section className={style.adblock}>
      {items &&
        items.map((item, index) => {
          return (
            <div key={`${index}${item?.title}`} className={style.adblock_card}>
              {item.href && (
                <div className={style.adblock_card_logo}>
                  <svg className={style.adblock_card_logo_wrap} onClick={() => {}}>
                    <use className={style.adblock_card_logo_wrap_svg} href={item.href} />
                  </svg>
                </div>
              )}
              {item.title && <h2 className={style.adblock_card_title}>{item.title}</h2>}
              {item.text && (
                <>
                  <hr className={style.adblock_card_hr} />
                  <span className={style.adblock_card_text}>{item.text}</span>
                </>
              )}
            </div>
          );
        })}
    </section>
  );
};
