import { Box, Typography } from "@mui/material";
import { IMetricNumber } from "./metric-number.type";
import { grey } from "@mui/material/colors";

export default function MetricNumber({ icon, title, value }: IMetricNumber) {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        borderRadius: 0.75,
        bgcolor: grey[50],
        border: `0.0625rem solid ${grey[400]}`,
      }}
    >
      <Box
        component="img"
        width={24}
        height={24}
        alt={title}
        src={icon}
        role="img"
      />

      <Typography
        variant="h1"
        sx={(theme) => ({
          color: theme.palette.primary.main,
          fontWeight: 500,
          mt: 0.75,
          mb: 0.5,
          fontSize: "1.5rem",
        })}
      >
        {value}
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
    </Box>
  );
}
