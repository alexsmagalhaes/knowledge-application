import { Box, Container, Paper, Tabs, Typography } from "@mui/material";
import { ReactElement, SetStateAction, useState } from "react";
import TabForm from "./tab";
import { grey } from "@mui/material/colors";

type TTab = {
  title: string;
  component: ReactElement;
};

interface IAuthFormCard {
  tabs: TTab[];
}

export default function AuthFormCard({ tabs }: IAuthFormCard) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: any, newValue: SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={12} sx={{ borderTop: "0.25rem #911892 solid" }}>
        <Container
          maxWidth="sm"
          sx={{
            padding: 4,
            paddingBottom: 0,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderBottom: "solid 1px",
            borderColor: grey[400],
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: "0.25rem" }}
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
        </Container>

        {tabs[value].component}
      </Paper>
    </Container>
  );
}
