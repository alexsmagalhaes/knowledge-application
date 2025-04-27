import { create } from "zustand";
import { ReactNode } from "react";

type ModalStore = {
  content: ReactNode | null;
  isOpen: boolean;
  open: (content: ReactNode) => void;
  close: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  content: null,
  isOpen: false,
  open: (content) => set({ content, isOpen: true }),
  close: () => set({ content: null, isOpen: false }),
}));
