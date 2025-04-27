import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { ReactElement } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useModalStore } from "@/store/use-modal.store";

type ModalTexts = {
  title: string;
  disclaimer: string;
};

interface IModalWrapper {
  children: ReactElement;
  content: ModalTexts;
}

function ModalWrapper({ children, content }: IModalWrapper) {
  const { close } = useModalStore();

  return (
    <Box
      sx={{
        borderRadius: 1,
        bgcolor: "white",
        overflow: "hidden",
        width: "100vw",
        maxWidth: "36.25rem",
      }}
    >
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "1.125rem", fontWeight: 500 }} variant="h2">
          {content.title}
        </Typography>
        <Button
          sx={{ width: "2rem", height: "2rem", p: 0, minWidth: "unset" }}
          onClick={close}
        >
          <CloseIcon />
        </Button>
      </Box>
      <Box
        sx={{
          borderBottom: "1px solid",
          borderTop: "1px solid",
          borderColor: grey[400],
          p: 2.5,
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          p: 2.5,
        }}
      >
        <Typography sx={{ fontSize: "0.6875rem" }}>
          {content.disclaimer}
        </Typography>
      </Box>
    </Box>
  );
}

export default ModalWrapper;
