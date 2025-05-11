import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ProfileRecent from "../profile-recent";
import ProfileNumbers from "../profile-numbers";

export default function ProfileCard() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        boxShadow: "0px 4px 48px 0px rgba(0, 0, 0, 0.02)",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: grey[400],
          p: { xs: 2, md: 2.5 },
          minHeight: "4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 700 }} variant="h6">
          Minhas métricas
        </Typography>
      </Box>
      <Box
        sx={{
          p: { xs: 2, md: 2.5 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <ProfileNumbers />
        <ProfileRecent />
      </Box>
    </Box>
  );
}
