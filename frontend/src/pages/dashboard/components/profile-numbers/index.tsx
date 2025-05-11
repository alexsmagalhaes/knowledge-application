import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function ProfileNumbers() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography>Contribuições e interações</Typography>

      <Box
        sx={{
          borderRadius: 0.75,
          border: `0.0625rem solid ${grey[300]}`,
          display: "flex",
        }}
      >
        <Box
          sx={{
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography variant="h3">24</Typography>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
            Views
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: grey[300],
            my: 2,
            width: "0.0625rem",
            justifySelf: "stretch",
            alignSelf: "stretch",
          }}
        />

        <Box
          sx={{
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography variant="h3">04</Typography>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
            Categ.
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: grey[300],
            my: 2,
            width: "0.0625rem",
            justifySelf: "stretch",
            alignSelf: "stretch",
          }}
        />

        <Box
          sx={{
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography variant="h3">13</Typography>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
            Artigos
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
