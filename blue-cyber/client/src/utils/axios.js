import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshToken as resetToken } from "../utils/reducer/AuthSlice";

const baseURL = "http://localhost:8084";
const accessToken = localStorage.getItem("accessToken") || null;
const axiosClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
});
export const axiosPrivate = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});
axiosClient.interceptors.request.use(async (config) => {
  if (config.headers.authorization) {
    const authorization = config.headers.authorization.split(" ");
    if (authorization[0] === "Bearer") {
      const token = jwtDecode(authorization[1]);
      const currentDate = new Date().getTime();
      if (token.exp * 1000 < currentDate) {
        await axiosPrivate
          .post("/auth/refresh-token", {
            accessToken: authorization[1],
            refreshToken: localStorage.getItem("refreshToken"),
          })
          .then((res) => {
            console.log(res.data);
            config.headers.authorization = `Bearer ${res.data.accessToken}`;
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("user", JSON.stringify(res.data));
            axiosClient.defaults.headers.authorization = `Bearer ${res.data.accessToken}`;
            return config;
          });
      }
    }
  } else {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// axiosClient.interceptors.request.use(async (config) => {
//   const accessToken = localStorage.getItem("accessToken");
//   const refreshToken = localStorage.getItem("refreshToken");
//   if (config.headers.authorization) {
//     if (accessToken && refreshToken) {
//       let currentDate = new Date().getTime();
//       const token = jwtDecode(accessToken);
//       if (token.exp * 1000 < currentDate) {
//         try {
//           const res = await resetToken({
//             refreshToken: refreshToken,
//             accessToken: accessToken,
//           });
//           config.headers.authorization = `Bearer ${res.payload.accessToken}`;
//           localStorage.setItem("accessToken", res.payload.accessToken);
//           localStorage.setItem("refreshToken", res.payload.refreshToken);
//         } catch (err) {
//           window.location.href = "/login";
//         }
//       } else {
//         return config;
//       }
//     } else {
//       config.headers.authorization = `Bearer ${accessToken}`;
//     }
//   }
//   return config;
// });

export default axiosClient;
