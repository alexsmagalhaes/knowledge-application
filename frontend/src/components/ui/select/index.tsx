import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { TSelect } from "./select.type";

function Select({ topLabel, options = [], ...props }: TSelect) {
  return (
    <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
      {topLabel && (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {topLabel}
        </Typography>
      )}

      <TextField
        select
        variant="outlined"
        sx={{
          borderRadius: 1,
          fontSize: "0.875rem",
        }}
        slotProps={{
          select: {
            sx: {
              height: 40,
              color: grey[900],
            },
          },
        }}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default Select;
