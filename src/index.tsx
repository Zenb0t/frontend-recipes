import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app/app-router';
import { chakraTheme } from './app/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="zenbot.us.auth0.com"
          clientId="uwcRPx0Hu0g7B30z37ZRsVxTaEGdW7Tp"
          redirectUri={window.location.origin}
        >
          <ChakraProvider theme={chakraTheme}>
            <AppRouter />
          </ChakraProvider>
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
