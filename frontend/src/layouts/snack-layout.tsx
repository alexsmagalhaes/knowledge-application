import useSnack from "@/hooks/use-snack";
import { IconButton, Snackbar, Alert, AlertColor } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarOrigin } from "@mui/material/Snackbar";

function SnackLayout() {
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

export default SnackLayout;
