import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { ReactElement } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useModalStore } from "@/store/use-modal.store";

type TModalTexts = {
  title: string;
  disclaimer: string;
};

type TModalSize = "sm" | "md";

const sizes: Record<TModalSize, string> = {
  sm: "34.25rem",
  md: "47.75rem",
};

interface IModalWrapper {
  children: ReactElement;
  content: TModalTexts;
  size?: TModalSize;
}

function ModalWrapper({ children, content, size = "sm" }: IModalWrapper) {
  const { close } = useModalStore();

  return (
    <Box
      component={"aside"}
      sx={{
        overflow: "hidden",
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 1,
        maxWidth: sizes[size],
        mx: "auto",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 2.5 },
          py: 2,
          minHeight: "4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontWeight: 500 }} variant="h5">
          {content.title}
        </Typography>
        <Button
          sx={{
            width: "2rem",
            height: "2rem",
            p: 0,
            minWidth: "unset",
          }}
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
          p: 2,
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          p: { xs: 2, md: 2.5 },
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
