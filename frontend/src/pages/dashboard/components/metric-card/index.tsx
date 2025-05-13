import Button from "@/components/ui/button";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/use-session.store";
import MetricNumber from "../metric-number";

//assets
import ArrowIcon from "@/assets/icons/arrow-right-icon-dark.svg";
import ArticleIcon from "@/assets/icons/article-icon-light.svg";
import CategoryIcon from "@/assets/icons/category-icon-light.svg";
import UserIcon from "@/assets/icons/user-icon-light.svg";

export default function MetricCard() {
  const { session } = useSessionStore();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin");
  };

  const metrics = [
    {
      icon: ArticleIcon,
      title: "Artigos",
      value: 1328,
    },
    {
      icon: CategoryIcon,
      title: "Categorias",
      value: 321,
    },
    {
      icon: UserIcon,
      title: "Usuários",
      value: 621,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        boxShadow: "0px 4px 48px 0px rgba(0, 0, 0, 0.02)",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box>
        <Typography variant="h3" component={"h1"} sx={{ fontWeight: 600 }}>
          Acesse e salve conteúdos difíceis de encontrar!
        </Typography>
        <Typography sx={{ marginTop: 1.5 }}>
          Chega de esquecer informações o que você vai precisar consultar no
          futuro.
        </Typography>
        {session?.admin && (
          <Box sx={{ marginTop: 3 }}>
            <Button size="medium" onClick={handleClick}>
              <Typography sx={{ color: "inherit" }}>Contribuir</Typography>
              <Box
                component={"img"}
                src={ArrowIcon}
                alt="Adicionar conteúdo"
                width={20}
                height={20}
              />
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ borderBottom: "1px solid", borderColor: grey[400] }} />

      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>
          Números alcançados
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {metrics.map((metric, index) => (
            <MetricNumber
              key={index}
              icon={metric.icon}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
