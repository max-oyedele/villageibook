import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider as ThemeProvider } from "@chakra-ui/react";
import theme from "styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
