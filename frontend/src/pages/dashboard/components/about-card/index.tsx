import { Box, Link, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function AboutCard() {
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
          Sobre o projeto
        </Typography>
      </Box>
      <Box sx={{ p: { xs: 2, md: 2.5 } }}>
        <Typography>
          Este é um projeto de estudo baseado no projeto ensinado no curso da
          cod3r.com.br.
          <br />
          <br />
          Tem o objetivo de aplicar tecnologias e conceitos de programação.{" "}
          Acesse o repositório para detalhes:
          <br />
          <br />
          Repositório:{" "}
          <Link
            href="https://github.com/alexsmagalhaes"
            target="_blank"
            sx={{ cursor: "pointer" }}
          >
            github/alexsmagalhaes
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
