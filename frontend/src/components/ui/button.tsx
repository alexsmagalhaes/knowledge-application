import theme from "@/styles/theme";
import { alpha } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

type ButtonProps = {
  size?: "small" | "medium";
  children: React.ReactNode;
};

function Button({ size = "small", children }: ButtonProps) {
  return (
    <MuiButton
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
