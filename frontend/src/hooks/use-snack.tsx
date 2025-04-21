import { useSnackStore } from "@/store/use-snack-store";
import { useCallback } from "react";

type TMessage = {
  message: string | null;
  type: "success" | "info" | "warning" | "error";
};

function useSnack() {
  const {
    handleClose,
    handleOpen: open,
    setMessage,
    isVisible,
    message,
  } = useSnackStore();

  const handleOpen = useCallback(
    (message: TMessage) => {
      setMessage(message);
      open();
    },
    [setMessage, open]
  );

  return { handleClose, handleOpen, isVisible, message };
}

export default useSnack;
