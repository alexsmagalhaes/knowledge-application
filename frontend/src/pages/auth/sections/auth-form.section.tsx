import AuthFormCard from "@/pages/auth/components/card-form";
import { Box, Container } from "@mui/material";

function AuthForm() {
  return (
    <Box component="section" sx={{ flex: 1, display: "flex" }}>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, md: 3 },
          py: 3,
          width: "100%",
        }}
      >
        <AuthFormCard />
      </Container>
    </Box>
  );
}

export default AuthForm;
