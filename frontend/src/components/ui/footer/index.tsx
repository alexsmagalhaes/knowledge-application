import useModal from "@/hooks/use-modal";
import { useSessionStore } from "@/store/use-session.store";
import { Box, Link as MuiLink, darken, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Link } from "react-router-dom";

function Footer() {
  const { session } = useSessionStore();
  const { open } = useModal(<></>);

  return (
    <Box
      component="footer"
      sx={{
        color: "white",
        backgroundColor: darken(deepPurple[900], 0.6),
        px: { xs: 2, md: 3 },
        display: { xs: "grid", md: "flex" },
        gridTemplateColumns: { xs: "1fr 1fr", md: "none" }, // define 2 colunas no xs
        flexDirection: { md: "row" },
        gap: 2,
        fontSize: "0.75rem",
        alignItems: "center",
        paddingY: 3,
      }}
    >
      <Typography
        sx={{
          color: "inherit",
          fontSize: "0.75rem",
          gridColumn: { xs: "span 2", md: "auto" },
        }}
      >
        <Typography
          sx={{ fontWeight: 700, display: "inline", color: "inherit" }}
        >
          Knowledger.AI
        </Typography>{" "}
        - Projeto de estudo inspirado no curso da cod3r.com.br
      </Typography>
      <Typography
        sx={{
          opacity: 0.4,
          color: "inherit",
          display: { xs: "none", md: "block" },
        }}
      >
        |
      </Typography>{" "}
      {session && (
        <MuiLink component={Link} to={"/"} sx={{ color: "inherit" }}>
          Dashboard
        </MuiLink>
      )}
      {session && session.admin && (
        <MuiLink component={Link} to={"/admin"} sx={{ color: "inherit" }}>
          Área do administrador
        </MuiLink>
      )}
      <MuiLink sx={{ color: "inherit", cursor: "pointer" }} onClick={open}>
        Ajuda e suporte
      </MuiLink>
      <Typography
        sx={{
          color: "inherit",
          fontSize: "0.75rem",
          ml: { xs: "unset", md: "auto" },
        }}
      >
        Feito por:{" "}
        <MuiLink
          component={Link}
          to={"https://www.linkedin.com/in/alexmagalhaes-dev/"}
          target="_blank"
          sx={{ color: "inherit", textDecoration: "underline" }}
        >
          Alex Magalhães Dev
        </MuiLink>
      </Typography>
    </Box>
  );
}

export default Footer;
