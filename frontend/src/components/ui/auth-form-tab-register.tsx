import { Box, FormControl, FormHelperText } from "@mui/material";
import Button from "./button";
import InputText from "./input";
import { FormEvent, useReducer, useCallback, useState } from "react";
import useSnack from "@/hooks/use-snack";
import { useRegister } from "@/queries/auth/use-register";

const useFormValidation = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = useCallback(() => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) {
      newErrors.name = "O nome completo é obrigatório.";
      valid = false;
    }

    if (!email) {
      newErrors.email = "O email é obrigatório.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "A senha precisa ter pelo menos 6 caracteres.";
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme a senha.";
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "As senhas não coincidem.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }, [name, email, password, confirmPassword]);

  return { errors, validate };
};

type TFormAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "RESET_ERRORS" };

type TFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState: TFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formReducer = (state: TFormState, action: TFormAction): TFormState => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
};

export default function AuthFormTabRegister() {
  const { handleOpen } = useSnack();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { errors, validate } = useFormValidation(
    state.name,
    state.email,
    state.password,
    state.confirmPassword
  );

  const { mutateAsync, error } = useRegister();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      handleOpen({
        message: "Por favor, preencha corretamente!",
        type: "error",
      });
      return;
    }

    try {
      await mutateAsync({
        name: state.name,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
      });

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
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControl error={!!errors.name} fullWidth>
          <InputText
            value={state.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
            fullWidth
            autoComplete="name"
            topLabel="Nome completo"
          />
          {errors.name && (
            <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>
              {errors.name}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl error={!!errors.email} fullWidth>
          <InputText
            value={state.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
            fullWidth
            autoComplete="email"
            topLabel="Email de acesso"
          />
          {errors.email && (
            <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>
              {errors.email}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl error={!!errors.password} fullWidth>
          <InputText
            value={state.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            fullWidth
            type="password"
            autoComplete="current-password"
            topLabel="Senha"
          />
          {errors.password && (
            <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>
              {errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl error={!!errors.confirmPassword} fullWidth>
          <InputText
            value={state.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: "SET_CONFIRM_PASSWORD",
                payload: e.target.value,
              })
            }
            fullWidth
            type="password"
            autoComplete="new-password"
            topLabel="Confirmar senha"
          />
          {errors.confirmPassword && (
            <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>
              {errors.confirmPassword}
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
        Fazer cadastro
      </Button>
    </Box>
  );
}
