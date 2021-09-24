import "../styles/globals.css";
import "../styles/fonts.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie"; //for jwt auth
import { Provider } from "react-redux";
import { wrapper, store } from "rdx/store";

import { ChakraProvider as ThemeProvider } from "@chakra-ui/react";
import theme from "styles/theme";

import ToastWrapper from "components/wrappers/ToastWrapper";
import RouterWrapper from "components/wrappers/RouterWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <ToastWrapper>
            <RouterWrapper>
              <Component {...pageProps} />
            </RouterWrapper>
          </ToastWrapper>
        </CookiesProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp); 