import { Box, darken, Typography } from "@mui/material";
import Button from "../button";
import { IArticleCard } from "./article-card.type";
import { grey } from "@mui/material/colors";
import Tag from "../tag";

export default function ArticleCard({
  //   id,
  title,
  description,
  imageUrl,
  categories,
}: IArticleCard) {
  return (
    <Box
      sx={{
        "&:hover .overlay": {
          opacity: 0.5,
        },
        "&:hover .buttonBox": {
          opacity: 1,
        },
        overflow: "hidden",
        borderRadius: 0.5,
        background: "white",
      }}
    >
      <Box sx={{ p: { xs: 2, md: 2.5 }, py: { xs: 2.5, md: 3 } }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          {categories.map((category) => (
            <Tag text={category} />
          ))}
        </Box>
        <Typography
          component={"h2"}
          variant="h4"
          sx={{
            marginTop: "1rem",
            marginBottom: "0.375rem",
            fontVariationSettings: '"wght" 600',
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          height: { xs: "11.25rem", md: "15.75rem" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className="buttonBox"
          sx={{
            zIndex: 2,
            opacity: 0,
            // transition: "0.1s ease",
          }}
        >
          <Button size="large">Veja mais</Button>
        </Box>

        <Box
          component="img"
          src={imageUrl}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        <Box
          className="overlay"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: darken(grey[900], 0.7),
            opacity: 0,
            zIndex: 1,
            transition: "opacity 0.3s ease, z-index 0.3s ease",
          }}
        />
      </Box>
    </Box>
  );
}
