import PropTypes from "prop-types";
import { Button, ListItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SideBarItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useLocation();
  const active = href ? router.pathname === href : false;
  return (
    <ListItem
      disableGutters
      sx={{
        display: "block",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Link to={href} style={{ textDecoration: "none" }}>
        <Button
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: active ? "secondary.main" : "neutral.300",
            fontWeight: active && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          {title}
        </Button>
      </Link>
    </ListItem>
  );
};

SideBarItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};

export default SideBarItem;
