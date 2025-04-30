import {
  Alert,
  AlertColor,
  Box,
  IconButton,
  Modal,
  Snackbar,
  SnackbarOrigin,
  SxProps,
  Theme,
} from "@mui/material";

import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

import useSnack from "@/hooks/use-snack";
import { useModalStore } from "@/store/use-modal.store";

function ModalRoot() {
  const { isOpen, content, close } = useModalStore();

  const baseStyles: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:"100%",
    p: 0,
    maxWidth: "calc(100% - 2rem)",
  };

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

function SnackRoot() {
  const { isVisible, handleClose, message } = useSnack();

  const position: SnackbarOrigin = { vertical: "bottom", horizontal: "right" };

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={position}
      key={position.vertical + position.horizontal}
    >
      <Alert
        onClose={handleClose}
        severity={(message?.type as AlertColor) || "info"}
        sx={{ width: "100%" }}
        variant="filled"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message?.message}
      </Alert>
    </Snackbar>
  );
}

interface IComponentsLayout {
  children: ReactNode;
}

function ComponentsLayout({ children }: IComponentsLayout) {
  return (
    <>
      {children}
      <SnackRoot />
      <ModalRoot />
    </>
  );
}

export default ComponentsLayout;
