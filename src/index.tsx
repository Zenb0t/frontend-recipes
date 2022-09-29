import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app/app-router';
// import { ThemeProvider } from '@mui/material';
import { chakraTheme } from './app/theme';
import { ChakraProvider } from '@chakra-ui/react';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={chakraTheme}>
          {/* <ThemeProvider theme={theme}> */}
            <AppRouter />
          {/* </ThemeProvider> */}
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
