import { Box, TextField, TextFieldProps, Typography } from "@mui/material";

type TInputText = TextFieldProps & {
  topLabel?: string;
};

function Input({ topLabel, ...props }: TInputText) {
  return (
    <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
      {topLabel && (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {topLabel}
        </Typography>
      )}

      <TextField
        slotProps={{
          input: {
            sx: {
              height: 40,
              paddingX: "0rem",
              borderWidth: "2px",
            },
          },
        }}
        variant="outlined"
        sx={{
          borderRadius: 1,
          fontSize: "0.875rem",
        }}
        {...props}
      />
    </Box>
  );
}

export default Input;
