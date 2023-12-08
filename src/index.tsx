import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/AppRouter";
import { chakraTheme } from "./app/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import sanitizedConfig from "./config";
import { Auth0ProviderWithNavigate } from "./app/Auth0CustomProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
       <Auth0ProviderWithNavigate>
          <ChakraProvider theme={chakraTheme}>
            <AppRouter />
          </ChakraProvider>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
