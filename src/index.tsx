import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./blog/components/theme";
import { ThemeProvider } from "@mui/material";
import store from "./blog/store/store";
import { CookiesProvider } from "react-cookie";
import App from "./login/Route";
import { ContextProvider } from "./Context/context";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
