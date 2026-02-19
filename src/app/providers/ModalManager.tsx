import { useAppSelector } from '@app/store';
import { DATA_MODALS } from './lib/data';

export const ModalManager = () => {
  const { isModalOpen, currentModal } = useAppSelector((state) => state.modalSelector);

  if (!isModalOpen) return null;

  return currentModal ? <div >{DATA_MODALS[currentModal]}</div> : null;
};
