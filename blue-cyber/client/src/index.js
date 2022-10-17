import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/system";
import App from "./App";
import { Provider } from "react-redux";
import { theme } from "./theme";
import { store } from "./utils/store";
import { BrowserRouter } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
