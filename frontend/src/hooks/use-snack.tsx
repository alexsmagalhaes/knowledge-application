import { useSnackStore } from "@/store/use-snack-store";

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
  const handleOpen = (message: TMessage) => {
    setMessage(message);
    open();
  };

  return { handleClose, handleOpen, isVisible, message };
}

export default useSnack;
