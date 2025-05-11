import { alpha, Button as MuiButton } from "@mui/material";
import { IButton } from "./button.type";

function Button({
  size = "medium",
  variant = "contained",
  themeMode = "light",
  children,
  onClick,
  ...props
}: IButton) {
  return (
    <MuiButton
      {...props}
      onClick={onClick}
      variant={variant}
      sx={(theme) => {
        const isDark = themeMode === "dark";
        const palette = theme.palette;

        const getBackgroundColor = () => {
          if (variant === "text" || variant === "outlined")
            return "transparent";
          return isDark ? "#fff" : palette.primary.main;
        };

        const getColor = () => {
          if (variant === "contained")
            return isDark ? palette.primary.main : "#fff";
          return isDark ? "#fff" : palette.primary.main;
        };

        const getHoverBackground = () => {
          if (variant === "text" || variant === "outlined") {
            return isDark
              ? alpha("#fff", 0.1)
              : alpha(palette.primary.main, variant === "text" ? 0.04 : 0.08);
          }
          return isDark
            ? alpha("#fff", 0.85)
            : alpha(palette.primary.main, 0.95);
        };

        const getBorder = () => {
          if (variant === "outlined") {
            return `1px solid ${
              isDark ? "#fff" : alpha(palette.primary.main, 0.5)
            }`;
          }
          return "none";
        };

        const sizeStyles = {
          small: {
            height: "2.5rem",
            padding: "0 1.25rem",
            fontSize: theme.typography.body2.fontSize ?? "0.875rem",
          },
          medium: {
            height: "3rem",
            padding: "0 1.5rem",
            fontSize: theme.typography.body1.fontSize ?? "1rem",
          },
          large: {
            height: "3.5rem",
            padding: "0 2rem",
            fontSize: theme.typography.h6.fontSize ?? "1.125rem",
          },
        };

        return {
          ...sizeStyles[size],
          backgroundColor: getBackgroundColor(),
          color: getColor(),
          border: getBorder(),
          "&:hover": {
            backgroundColor: getHoverBackground(),
          },
          fontWeight: 600,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          textTransform: "initial",
          borderRadius: "0.25rem",
          boxShadow: "none",
        };
      }}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
