import { Box, FormControl, FormHelperText } from "@mui/material";
import ModalWrapper from "../modal-wrapper";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSnack from "@/hooks/use-snack";
import useSupport from "@/hooks/use-support";

const schema = z.object({
  type: z.string().nonempty("Escolha uma das opções."),
  description: z
    .string()
    .nonempty("Descreva o ocorrido.")
    .min(20, "A descrição deve ter pelo menos 20 caracteres."),
});

type FormData = z.infer<typeof schema>;

export default function SupportModal() {
  const { create } = useSupport();
  const { mutateAsync } = create;

  const { handleOpen } = useSnack();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync(data);
      handleOpen({
        message: "Chamdo enviado com sucesso!",
        type: "success",
      });
    } catch (msg: any) {
      handleOpen({
        message: msg.message,
        type: "error",
      });
    }
  };

  const content = {
    title: "Fale com o suporte",
    disclaimer: "O suporte leva em média até 24h para retornar o seu chamado.",
  };

  return (
    <ModalWrapper content={content} size="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormControl error={!!errors.type} fullWidth>
          <Select
            {...register("type")}
            name="type"
            topLabel="Tipo da ocorrência"
            options={[
              { label: "Selecione uma opção", value: "" },
              { label: "Erro no sistema", value: "SYSTEM_ERROR" },
              { label: "Troca de senha", value: "CHANGE_PASSWORD" },
              { label: "Problemas para acessar", value: "ACCESS_ERROR" },
              { label: "Algo fora do lugar", value: "LAYOUT_BROKEN" },
              { label: "Feedback ou sugestão", value: "FEEDBACK" },
              { label: "Outro", value: "SOMETHING_ELSE" },
            ]}
          />
          {errors.type && (
            <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>
              {errors.type.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl error={!!errors.description} fullWidth>
          <Input
            {...register("description")}
            multiline
            rows={4}
            topLabel="Descreva o ocorrido"
          />
          {errors.description && (
            <FormHelperText sx={{ marginLeft: 0, marginTop: 1 }}>
              {errors.description.message}
            </FormHelperText>
          )}
        </FormControl>

        <Button size="medium" type="submit">
          Enviar mensagem
        </Button>
      </Box>
    </ModalWrapper>
  );
}
