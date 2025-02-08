import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  isOpen: boolean;
  modalType: "login" | "register" | "registerSuccess" | "video" | null;
  trailerLink: string | null;
};

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  trailerLink: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: "login" | "register" | "registerSuccess" | "video"; link?: string }>
    ) => {
      switch (action.payload.type) {
        case "login":
          state.isOpen = true;
          state.modalType = "login";
          state.trailerLink = null;
          break;

        case "register":
          state.isOpen = true;
          state.modalType = "register";
          state.trailerLink = null;
          break;

        case "registerSuccess":
          state.isOpen = true;
          state.modalType = "registerSuccess";
          state.trailerLink = null;
          break;

        case "video":
          state.isOpen = true;
          state.modalType = "video";
          state.trailerLink = action.payload.link || null;
          break;

        default:
          state.isOpen = false;
          state.modalType = null;
          state.trailerLink = null;
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.trailerLink = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
