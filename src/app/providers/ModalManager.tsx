import { useAppSelector } from '@app/store';
import { DATA_MODALS } from './lib/data';
import { Modal } from '@features/modal/Modal';

export const ModalManager = () => {
  const { isModalOpen, currentModal } = useAppSelector((state) => state.modalSelector);

  if (!isModalOpen) return null;

  return currentModal ? <Modal>{DATA_MODALS[currentModal]}</Modal> : null;
};
