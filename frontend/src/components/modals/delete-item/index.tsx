import { Box, Typography } from "@mui/material";
import ModalWrapper from "../modal-wrapper";
import { grey } from "@mui/material/colors";
import Button from "@/components/ui/button";
import { useModalStore } from "@/store/use-modal.store";

//asserts
import DeleteIcon from "@/assets/icons/delete-icon-light.svg";

function DeleteModal() {
  const { close } = useModalStore();

  return (
    <ModalWrapper
      content={{
        title: "Exclusão de dados",
        disclaimer:
          "Para continuar, o item não pode estar associado a nenhum outro.",
      }}
    >
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            gap: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component={"img"} src={DeleteIcon} alt="Deletar item" />
          <Typography
            sx={{
              color: grey[900],
              fontSize: 16,
              fontWeight: 600,
              marginTop: 2,
              marginBottom: 1,
            }}
          >
            Deseja excluir este item?
          </Typography>
          <Typography>
            O item será apagado de forma permanente dos registros.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1.25, width: "100%" }}>
          <Button sx={{ flexGrow: "1" }}>Excluir item</Button>
          <Button sx={{ flexGrow: "1" }} onClick={close}>Cancelar</Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
}

export default DeleteModal;
