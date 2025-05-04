import { TextFieldProps } from "@mui/material";

export type TSelectOption = {
  label: string;
  value: string | number;
};

export type TSelect = TextFieldProps & {
  topLabel?: string;
  options: TSelectOption[];
};
