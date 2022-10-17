import { Fragment } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { history } from "./hook/history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <Fragment>
      <Routes>
        {/* <Route
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          /> */}
        {publicRoutes.map((route, index) => {
          let Layout;
          let AuthProvider;
          if (route.layout === null) {
            Layout = Fragment;
            AuthProvider = Fragment;
          } else {
            Layout = route.layout || DefaultLayout;
            AuthProvider = PrivateRoute;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <AuthProvider>
                  <Layout>
                    <Page />
                  </Layout>
                </AuthProvider>
              }
            />
          );
        })}
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
}

export default App;
