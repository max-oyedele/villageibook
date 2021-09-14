import "../styles/globals.css";
import "../styles/fonts.css";

import { useEffect } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { wrapper, store } from "rdx/store";

import { ChakraProvider as ThemeProvider } from "@chakra-ui/react";
import theme from "styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
