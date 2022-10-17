import React from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { upFirstName } from "../../../../hook/upFirstKey";
import { useNavigate } from "react-router-dom";
const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));
const Navbar = (props) => {
  const navigator = useNavigate();
  const { onSidebarOpen, ...other } = props;
  const { username } = useSelector(({ authData }) => authData.auth);
  if (!username) {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) navigator("/login");
  }
  return (
    <NavbarRoot
      sx={{
        left: {
          lg: 280,
        },
        width: {
          lg: "calc(100% - 280px)",
        },
      }}
      {...other}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: "inline-flex",
              lg: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        {/* <Tooltip title="Contacts">
          <IconButton sx={{ ml: 1 }}>
            <UsersIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton sx={{ ml: 1 }}>
            <Badge badgeContent={4} color="primary" variant="dot">
              <BellIcon fontSize="small" />
            </Badge>
          </IconButton> 
</Tooltip> */}
        <Typography color="primary" variant="subtitle1">
          {upFirstName(username || "Admin")}
        </Typography>
      </Toolbar>
    </NavbarRoot>
  );
};
Navbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
export default Navbar;
