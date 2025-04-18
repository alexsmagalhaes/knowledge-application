import useSnack from "@/hooks/use-snack";
import { IconButton } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import theme from "@/styles/theme";

function SnackLayout() {
  const { isVisible, handleClose, message } = useSnack();

  const position: SnackbarOrigin = { vertical: "bottom", horizontal: "right" };

  return (
    <Snackbar
      slotProps={{
        content: {
          sx: {
            bgcolor: "white",
            color: grey[800],
            boxShadow: 24,
            borderRadius: 1,
            borderLeft: `0.25rem solid ${
              theme.palette[message?.type || "info"].main
            }`,
          },
        },
      }}
      open={isVisible}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message?.message}
      key={position.vertical + position.horizontal}
      anchorOrigin={position}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
}

export default SnackLayout;
