import { Box, FormControl, FormHelperText } from "@mui/material";
import Button from "./button";
import InputText from "./input";
import { FormEvent, useState } from "react";

export default function AuthFormTabRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: FormEvent) => {};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControl error={!!errors.name} fullWidth>
          <InputText
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            topLabel="Nome completo"
          />
          {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
        </FormControl>

        <FormControl error={!!errors.email} fullWidth>
          <InputText
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            topLabel="Email de acesso"
          />
          {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
        </FormControl>

        <FormControl error={!!errors.password} fullWidth>
          <InputText
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            topLabel="Senha"
          />
          {errors.password && (
            <FormHelperText>{errors.password}</FormHelperText>
          )}
        </FormControl>

        <FormControl error={!!errors.confirmPassword} fullWidth>
          <InputText
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            topLabel="Confirmar senha"
          />
          {errors.confirmPassword && (
            <FormHelperText>{errors.confirmPassword}</FormHelperText>
          )}
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
        Fazer cadastro
      </Button>
    </Box>
  );
}
