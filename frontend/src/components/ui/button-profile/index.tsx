import { useState } from "react";
import { useSessionStore } from "@/store/use-session.store";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import useAuth from "@/hooks/use-auth";

// assets
import ArrowIcon from "@/assets/icons/nav-arrow-icon-dark.svg";
import LogoutIcon from "@/assets/icons/logout-icon-light.svg";

export default function ButtonProfile() {
  const { session } = useSessionStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const nameParts = session?.name?.split(" ").filter(Boolean) || ["U"];
  const userInitials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const userRole: Role = session?.admin ? "admin" : "member";

  return (
    <>
      <Box
        onClick={handleOpenMenu}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
        }}
      >
        <Box
          sx={(theme) => ({
            bgcolor: theme.palette.primary.main,
            height: "2.25rem",
            width: "2.25rem",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Typography sx={{ color: "inherit", fontSize: "0.8125rem" }}>
            {userInitials}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: 600, color: "inherit" }}>
            {session?.name}
          </Typography>
          <Typography
            sx={{
              color: "inherit",
              opacity: 0.75,
              fontSize: "0.6875rem",
              textTransform: "capitalize",
            }}
          >
            {userRole}
          </Typography>
        </Box>

        <Box
          sx={{ transform: open ? "rotate(180deg)" : "unset" }}
          component="img"
          width={16}
          height={16}
          src={ArrowIcon}
        />
      </Box>

      <ProfileMenu anchorEl={anchorEl} open={open} onClose={handleCloseMenu} />
    </>
  );
}

function ProfileMenu({
  anchorEl,
  open,
  onClose,
}: {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}) {
  const { logout } = useAuth();

  const handleLogoutClick = () => {
    onClose();
    logout();
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            mt: 3,
            border: `1px solid ${grey[200]}`,
            boxShadow: "0px 4px 48px 0px rgba(0, 0, 0, 0.02)",
            minWidth: "16rem",
          },
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem
        onClick={handleLogoutClick}
        sx={{ display: "flex", gap: 1.5, px: 2, py: 1, height: "2.375rem" }}
      >
        <Box component="img" src={LogoutIcon} width={20} height={20} />
        <Typography>Fazer logout</Typography>
      </MenuItem>
    </Menu>
  );
}
