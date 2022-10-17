import { Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography align="center" color="textPrimary" variant="h1">
              403: You do not have access
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <img
                alt="Under development"
                src="https://cdn.dribbble.com/users/1195157/screenshots/4375493/media/7d5935302d19145d81fafbecf886fb26.png"
                style={{
                  marginTop: 50,
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 560,
                }}
              />
            </Box>

            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3 }}
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Go back to login
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
