import { Box, FormControl, FormHelperText } from "@mui/material";
import Button from "./button";
import InputText from "./input";
import { FormEvent, useReducer, useCallback, useState } from "react";
import { useLogin } from "@/queries/auth/use-login";
import useSnack from "@/hooks/use-snack";

const useFormValidation = (email: string, password: string) => {
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = useCallback(() => {
    let valid = true;
    const newErrors = { email: "", password: "" };

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
    }

    setErrors(newErrors);
    return valid;
  }, [email, password]);

  return { errors, validate };
};

const useAuthSubmit = (
  email: string,
  password: string,
  handleOpen: Function
) => {
  const { mutateAsync } = useLogin();

  const submit = async () => {
    try {
      await mutateAsync({ email, password });
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

  return submit;
};

type TFormAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "RESET_ERRORS" };

type TFormState = {
  email: string;
  password: string;
};

const initialState: TFormState = {
  email: "",
  password: "",
};

const formReducer = (state: TFormState, action: TFormAction): TFormState => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default function AuthFormTabLogin() {
  const { handleOpen } = useSnack();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const { errors, validate } = useFormValidation(state.email, state.password);
  const submit = useAuthSubmit(state.email, state.password, handleOpen);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      handleOpen({ message: "Email ou senha inválidos!", type: "error" });
      return;
    }

    submit();
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
