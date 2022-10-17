// import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Cog as CogIcon } from "../../../../icons/cog";
import { Selector as SelectorIcon } from "../../../../icons/selector";
import { User as UserIcon } from "../../../../icons/user";
import StorageIcon from "@mui/icons-material/Storage";
import { Users as UsersIcon } from "../../../../icons/users";
import LogoutIcon from "@mui/icons-material/Logout";
import SideBarItem from "./SideBarItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../utils/reducer/AuthSlice";

const items = [
  {
    href: "/users",
    icon: <UsersIcon fontSize="small" />,
    title: "Users",
  },
  {
    href: "/servers",
    icon: <StorageIcon fontSize="small" />,
    title: "Servers",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Settings",
  },
];

const Sidebar = (props) => {
  const navigate = useNavigate();
  const { username, isAdmin } = useSelector(({ authData }) => authData);
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  {username}
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  {isAdmin === 1 ? "You tier : Admin" : "You tier : Member"}
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items
            .filter((item) => {
              if (isAdmin !== 1) return item.href !== "/users";
              return item;
            })
            .map((item) => (
              <SideBarItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
                onClick={onClose}
              />
            ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          ></Box>
          <Button
            color="secondary"
            component="a"
            onClick={handleLogout}
            endIcon={<LogoutIcon />}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
export default Sidebar;
