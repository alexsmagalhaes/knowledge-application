import { useModalStore } from "@/store/use-modal-store";
import { ReactNode } from "react";

type TUseModal = ReactNode;

function useModal(content: TUseModal) {
  const { open: openModal, close, isOpen } = useModalStore();
  const open = () => openModal(content);

  return { open, close, isOpen };
}

export default useModal;
