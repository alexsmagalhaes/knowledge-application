import { Box, FormControl, FormHelperText } from "@mui/material";
import Button from "@/components/ui/button";
import InputText from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSnack from "@/hooks/use-snack";
import useAuth from "@/hooks/use-auth";

const schema = z.object({
  email: z.string().nonempty("O email é obrigatório.").email("Email inválido."),
  password: z.string().nonempty("A senha é obrigatória."),
});

type FormData = z.infer<typeof schema>;

export default function TabLogin() {
  const { handleOpen } = useSnack();
  const { login } = useAuth();
  const { mutateAsync } = login;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync(data);
      handleOpen({
        message: "Bem-vindo! Login realizado com sucesso!",
        type: "success",
      });
    } catch (err: any) {
      handleOpen({
        message: err.message,
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControl error={!!errors.email} fullWidth>
          <InputText
            {...register("email")}
            fullWidth
            autoComplete="email"
            topLabel="Email de acesso"
          />
          {errors.email && (
            <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>
              {errors.email.message}
            </FormHelperText>
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
            <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

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
        Realizar login
      </Button>
    </Box>
  );
}
