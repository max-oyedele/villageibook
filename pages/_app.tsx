import "../styles/globals.css";
import "../styles/fonts.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"; //for OAuth
import { CookiesProvider } from "react-cookie"; //for jwt auth
import { Provider } from "react-redux";
import { wrapper, store } from "rdx/store";

import { ChakraProvider as ThemeProvider } from "@chakra-ui/react";
import theme from "styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <CookiesProvider>
            <Component {...pageProps} />
          </CookiesProvider>
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
