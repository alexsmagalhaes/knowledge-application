import theme from "@/styles/theme";
import { alpha } from "@mui/material";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type ButtonProps = {
  size?: "small" | "medium";
  children: React.ReactNode;
  onClick?: () => void;
} & MuiButtonProps;

function Button({ size = "small", children, onClick, ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      onClick={onClick}
      variant="contained"
      sx={{
        height: size === "small" ? "2.5rem" : "3rem",
        fontSize: "0.875rem",
        fontWeight: 600,
        textTransform: "initial",
        padding: size === "small" ? "0 1.25rem" : "0 1.5rem",
        borderRadius: "0.25rem",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
          backgroundColor: alpha(theme.palette.primary.main, 0.95),
        },
      }}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
