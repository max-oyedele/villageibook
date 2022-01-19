import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/paginate.css";
import "../styles/components.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper, store } from "rdx/store";

import { ChakraProvider as ThemeProvider } from "@chakra-ui/react";
import theme from "styles/theme";

import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture"
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PayPalScriptProvider options={initialOptions}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </PayPalScriptProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
