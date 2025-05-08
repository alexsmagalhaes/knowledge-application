import { ButtonProps } from "@mui/material";

export interface IButton extends Omit<ButtonProps, "size" | "variant"> {
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  themeMode?: "light" | "dark";
}
