import AuthFormCard from "@/components/ui/auth-form-card";
import AuthFormTabLogin from "@/components/ui/auth-form-tab-login";
import AuthFormTabRegister from "@/components/ui/auth-form-tab-register";
import { Container } from "@mui/material";

function AuthForm() {
  const tabs = [
    {
      title: "Realizar login",
      component: <AuthFormTabLogin />,
    },
    {
      title: "Faça seu cadastro",
      component: <AuthFormTabRegister />,
    },
  ];

  return (
    <section>
      <Container
        maxWidth={false}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <AuthFormCard tabs={tabs} />
      </Container>
    </section>
  );
}

export default AuthForm;
