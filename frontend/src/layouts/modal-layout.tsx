import { useModalStore } from "@/store/use-modal.store";
import { Box, Modal, SxProps, Theme } from "@mui/material";

const baseStyles: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
};

export default function ModalLayout() {
  const { isOpen, content, close } = useModalStore();

  if (!content) return;

  return (
    <Modal
      open={isOpen}
      onClose={() => close()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={baseStyles}>{content}</Box>
    </Modal>
  );
}
