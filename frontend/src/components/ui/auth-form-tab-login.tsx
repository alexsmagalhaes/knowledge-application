import { Box, FormControl, FormHelperText } from "@mui/material";
import Button from "./button";
import InputText from "./input";
import { FormEvent, useState } from "react";

export default function AuthFormTabLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControl error={!!errors.email} fullWidth>
          <InputText
            fullWidth
            autoComplete="email"
            topLabel="Email de acesso"
          />
          {errors.email && <FormHelperText>Insira a senha</FormHelperText>}
        </FormControl>

        <FormControl error={!!errors.password} fullWidth>
          {" "}
          <InputText
            fullWidth
            type="password"
            autoComplete="current-password"
            topLabel="Senha"
          />
          {errors.password && <FormHelperText>Insira a senha</FormHelperText>}
        </FormControl>
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          fontWeight: "bold",
          textTransform: "none",
          backgroundColor: "#5E34D7",
          "&:hover": {
            backgroundColor: "#4B28B8",
          },
        }}
      >
        Realizar login
      </Button>
    </Box>
  );
}
