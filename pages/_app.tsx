import "../styles/globals.css";
import "../styles/fonts.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper, store } from "rdx/store";

import { ChakraProvider as ThemeProvider } from "@chakra-ui/react";
import theme from "styles/theme";

import ToastWrapper from "components/wrappers/ToastWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastWrapper>
          <Component {...pageProps} />
        </ToastWrapper>
      </ThemeProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
