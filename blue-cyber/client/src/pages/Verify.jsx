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
import { Navigate, useNavigate } from "react-router-dom";
import { verify } from "../utils/reducer/AuthSlice";
const Verify2fa = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { success, error, auth } = useSelector((state) => state.authData);
  const dataUser = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(4, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    token: Yup.number().required("Required").min(6, "Too Short!"),
  });
  const formik = useFormik({
    initialValues: {
      username: auth ? auth.username : "",
      password: auth ? auth.password : "",
      token: "",
    },
    validationSchema: dataUser,
    onSubmit: async () => {
      const res = await dispatch(verify(formik.values));
      if (res.error) {
        toast.error(res.payload);
      } else {
        toast.success("Successfuly");
        navigate("/");
      }
    },
  });
  return (
    <>
      {auth.password ? (
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
                  Two-Factor Authentication
                </Typography>
              </Box>
              <TextField
                error={Boolean(formik.touched.token && formik.errors.token)}
                fullWidth
                helperText={formik.touched.token && formik.errors.token}
                label="Token"
                margin="normal"
                name="token"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.token}
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
                  Verify
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
};

export default Verify2fa;
