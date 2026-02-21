import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DATA_MODALS } from '../lib/data';

type TModalType = keyof typeof DATA_MODALS;

interface IModalState {
  isModalOpen: boolean;
  currentModal: TModalType | null;
  previousModal: TModalType | null;
}

const initialModalState: IModalState = {
  currentModal: null,
  isModalOpen: true,
  previousModal: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    openModal: (state, action: PayloadAction<TModalType>) => {
      state.isModalOpen = true;
      state.previousModal = state.currentModal;
      state.currentModal = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.currentModal = null;
      state.previousModal = null;
    },
    returnToPreviousModal: (state) => {
      if (state.previousModal) {
        state.currentModal = state.previousModal;
        state.previousModal = null;
      } else {
        state.isModalOpen = false;
        state.currentModal = null;
      }
    },
  },
});

export const { openModal, closeModal, returnToPreviousModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
