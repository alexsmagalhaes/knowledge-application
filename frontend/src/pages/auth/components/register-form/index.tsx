import { Box, FormControl, FormHelperText } from "@mui/material";
import Button from "@/components/ui/button";
import InputText from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useSnack from "@/hooks/use-snack";
import useAuth from "@/hooks/use-auth";

const registerSchema = z
  .object({
    name: z.string().nonempty("O nome completo é obrigatório."),
    email: z
      .string()
      .nonempty("O email é obrigatório.")
      .email("Email inválido."),
    password: z
      .string()
      .min(6, "A senha precisa ter pelo menos 6 caracteres."),
    confirmPassword: z.string().nonempty("Confirme a senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem.",
  });

type TRegisterFormValues = z.infer<typeof registerSchema>;

export default function TabRegister() {
  const { handleOpen } = useSnack();
  const { register: registerUser } = useAuth();
  const { mutateAsync, error } = registerUser;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: TRegisterFormValues) => {
    try {
      await mutateAsync(data);
      handleOpen({
        message: "Cadastro realizado com sucesso!",
        type: "success",
      });
    } catch (err) {
      handleOpen({
        message: error?.message || "Erro ao criar o usuário.",
        type: "error",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: { xs: 2, md: 3 },
      }}
    >
      <FormControl error={!!errors.name} fullWidth>
        <InputText
          {...register("name")}
          fullWidth
          autoComplete="name"
          topLabel="Nome completo"
        />
        {errors.name && (
          <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>{errors.name.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.email} fullWidth>
        <InputText
          {...register("email")}
          fullWidth
          autoComplete="email"
          topLabel="Email de acesso"
        />
        {errors.email && (
          <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>{errors.email.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.password} fullWidth>
        <InputText
          {...register("password")}
          type="password"
          fullWidth
          autoComplete="current-password"
          topLabel="Senha"
        />
        {errors.password && (
          <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>{errors.password.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.confirmPassword} fullWidth>
        <InputText
          {...register("confirmPassword")}
          type="password"
          fullWidth
          autoComplete="new-password"
          topLabel="Confirmar senha"
        />
        {errors.confirmPassword && (
          <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>{errors.confirmPassword.message}</FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
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
