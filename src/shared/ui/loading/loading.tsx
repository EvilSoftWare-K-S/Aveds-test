import style from './loading.module.scss';
export const Loading = () => {
  return (
    <div className={style.lds_heart}>
      <div>{null}</div>
    </div>
  );
};
