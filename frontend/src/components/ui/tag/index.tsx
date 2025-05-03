import Box from "@mui/material/Box";
import { ITag } from "./tag.type";
import { lighten } from "@mui/material";

function Tag({ text }: ITag) {
  return (
    <Box
      sx={(theme) => ({
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: "0.75rem",
        height: "1.375rem",
        borderRadius: 0.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: lighten(theme.palette.primary.main, 0.9),
      })}
    >
      {text}
    </Box>
  );
}

export default Tag;
