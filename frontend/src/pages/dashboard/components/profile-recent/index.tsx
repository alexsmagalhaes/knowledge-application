import Tag from "@/components/ui/tag";
import { Box, Typography } from "@mui/material";

export default function ProfileRecent() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography>Tópicos vistos recentemente</Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Tag text={"React JS"} />
        <Tag text={"Clean Code"} />
        <Tag text={"Zustand"} />
      </Box>
    </Box>
  );
}
