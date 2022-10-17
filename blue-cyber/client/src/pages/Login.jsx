import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Container,
  Link as Mlink,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { login } from "../utils/reducer/AuthSlice";
const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { success, error } = useSelector((state) => state.authData);
  const dataUser = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(4, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: dataUser,
    onSubmit: async () => {
      const res = await dispatch(login(formik.values));
      console.log(res.payload);
      if (res.error) {
        toast.error(res.payload);
      } else {
        if (res.payload.accessToken) {
          toast.success("Successfuly");
          navigate("/");
        } else {
          toast.success("Successfuly");
          navigate("/verify");
        }
      }
    },
  });
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
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="username"
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
