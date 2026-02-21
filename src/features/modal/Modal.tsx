import style from './Modal.module.scss';
import { Button } from '@shared/ui/button';
import { useDispatch } from 'react-redux';
import { closeModal } from '@app/providers/model/ModalProvider';

export const Modal = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const dispatch = useDispatch();
  const handlerOnClose = () => {
    dispatch(closeModal());
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handlerOnClose();
    }
  };
  return (
    <div onMouseDown={handleOverlayClick} className={style.modal} >
      <div className={style.modal_wrap}>
        <div className={style.modal_wrap_head}>
          <h2 className={style.modal_wrap_head_title}>Авторизация</h2>
          <Button theme='secondary' size='auto' onClick={handlerOnClose}>
            X
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
