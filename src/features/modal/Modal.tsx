import style from './Modal.module.scss';
import { Button } from '@shared/ui/button';
import { useDispatch } from 'react-redux';
import { closeModal } from '@app/providers/model/ModalProvider';
import { useEffect, useState } from 'react';

export const Modal = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
  const dispatch = useDispatch();
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const handlerOnClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(closeModal());
      setIsMounted(false);
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handlerOnClose();
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      onMouseDown={handleOverlayClick}
      className={`${style.modal} ${isClosing ? style.modal_closing : ''}`}
    >
      <div className={`${style.modal_wrap} ${isClosing ? style.modal_wrap_closing : ''}`}>
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
