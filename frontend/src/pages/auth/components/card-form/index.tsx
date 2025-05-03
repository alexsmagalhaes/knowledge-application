import { Box, Paper, Tabs, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import TabForm from "../tab-form";
import { grey } from "@mui/material/colors";
import TabLogin from "../login-form";
import TabRegister from "../register-form";

const tabs = [
  {
    title: "Realizar login",
    component: <TabLogin />,
  },
  {
    title: "Faça seu cadastro",
    component: <TabRegister />,
  },
];

export default function AuthFormCard() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: any, newValue: SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        borderTop: "0.25rem #911892 solid",
        maxWidth: { xs: "none", md: "36.25rem" },
        width: "100%",
        boxShadow: "0px 4px 48px 0px rgba(0, 0, 0, 0.02)",
      }}
    >
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          pb: { xs: 0, md: 0, lg: 0, xl: 0 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1.5 },
          borderBottom: "solid 1px",
          borderColor: grey[400],
        }}
      >
        <Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, marginBottom: "0.5rem" }}
          >
            Bem-vindo(a) ao knowledger.AI!
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Entre ou crie sua conta para acessar todo o conteúdo disponível.
          </Typography>
        </Box>

        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab) => {
            return <TabForm label={tab.title} />;
          })}
        </Tabs>
      </Box>

      {tabs[value].component}
    </Paper>
  );
}
