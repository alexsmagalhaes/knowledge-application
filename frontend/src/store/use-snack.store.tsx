import { create } from "zustand";

type TMessage = {
  message: string | null;
  type: "success" | "info" | "warning" | "error";
};

type TStore = {
  isVisible: boolean;
  message: TMessage | null;
  setMessage: (message: TMessage) => void;
  handleOpen: () => void;
  handleClose: () => void;
};

export const useSnackStore = create<TStore>((set) => ({
  isVisible: false,
  message: null,
  setMessage: (message) => set(() => ({ message })),
  handleOpen: () => set(() => ({ isVisible: true })),
  handleClose: () => set(() => ({ isVisible: false })),
}));
