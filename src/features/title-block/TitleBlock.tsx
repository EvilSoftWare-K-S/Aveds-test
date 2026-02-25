import style from './TitleBlock.module.scss';
type TTitleBlock = {
  textTitle?: string;
  children?: React.ReactNode;
};
export const TitleBlock: React.FC<TTitleBlock> = ({ textTitle, children }): React.ReactNode => {
  return (
    <section className={style.titleBlock}>
      <h1 className={style.titleBlock_title}>{textTitle}</h1>
      {children && <div className={style.titleBlock_buttonPanel}>{children}</div>}
    </section>
  );
};
