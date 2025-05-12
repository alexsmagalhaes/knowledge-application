import { Box, darken, Link as MuiLink, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useLocation } from "react-router-dom";
import { useSessionStore } from "@/store/use-session.store";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from "../button";
import useModal from "@/hooks/use-modal";
import SupportModal from "@/components/modals/support";
import ButtonProfile from "../button-profile";

// assets
import Logo from "@/assets/icons/logo-complete-dark.svg";

export default function Navbar() {
  const { session } = useSessionStore();
  const { open } = useModal(<SupportModal />);
  const location = useLocation();

  return (
    <Box
      component="nav"
      sx={{
        color: "white",
        backgroundColor: darken(grey[900], 0.1),
        px: { xs: 2, md: 3 },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        fontSize: "0.75rem",
        paddingY: 2,
        minHeight: "4rem",
        zIndex: 99,
        position: "sticky",
        top: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <MuiLink
          component={Link}
          to="/"
          sx={{
            lineHeight: 0,
            "&:hover": {
              opacity: 0.95,
            },
          }}
        >
          <Box component="img" src={Logo} alt="Knowleager.AI" />
        </MuiLink>

        {session && (
          <Box
            sx={{
              width: "0.0625rem",
              opacity: 0.4,
              bgcolor: "white",
              alignSelf: "stretch",
            }}
          />
        )}

        {session && (
          <MuiLink component={Link} to={"/"} sx={{ color: "inherit" }}>
            <Typography
              sx={{
                color: "inherit",
                textDecoration:
                  location.pathname === "/" ? "underline" : "none",
              }}
            >
              Dashboard
            </Typography>
          </MuiLink>
        )}

        {session?.admin && (
          <MuiLink
            component={Link}
            to={"/admin"}
            sx={{
              color: "inherit",
              textDecoration:
                location.pathname === "/admin" ? "underline" : "none",
            }}
          >
            <Typography sx={{ color: "inherit" }}>
              Área do administrador
            </Typography>
          </MuiLink>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Button size="small" variant="text" themeMode="dark" onClick={open}>
          <HelpOutlineIcon sx={{ width: "1.25rem" }} />
          <Typography sx={{ color: "inherit", textDecoration: "underline" }}>
            Ajuda e Suporte
          </Typography>
        </Button>

        {session && <ButtonProfile />}
      </Box>
    </Box>
  );
}
