import { extendTheme, Theme } from "@chakra-ui/react";
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools";
import { SystemStyleObject } from "@chakra-ui/system";

const theme: Theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  colors: {
    primary: "teal.600",
    purpleTone: "#553CFB",
    grayTone: "#F8F8FA",
    grayButton: "#E0E0E0",
    greenTone: "#36CFD1",
  },
  fonts: {
    body: `'Sofia Pro', sans-serif`,
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: "purpleTone",
          color: "white",
          _hover: {
            bg: "purpleTone",
            _disabled: {
              bg: "purpleTone",
            }
          },
          _focus: { 
            outline: "none",
            boxShadow: "none"
          },
          _disabled: {
            bg: "purpleTone",
            opacity: 1
          }
        },
        gray: {
          bg: "grayButton",
          color: "gray.600",
          _hover: {
            bg: "grayButton",
            _disabled: {
              bg: "grayButton",
            }
          },
          _focus: { 
            outline: "none",
            boxShadow: "none"
          },
          _disabled: {
            bg: "grayButton",
            opacity: 1
          }
        },
      },
    },
  },
  styles: {
    global: (props: GlobalStyleProps): SystemStyleObject => ({
      body: {
        fontFamily: "body",
        color: mode("gray.700", "whiteAlpha.900")(props),
        bg: mode("gray.50", "gray.800")(props),
        transition: "background-color 0.2s",
        lineHeight: "calc(8px + 2ex)",
      },

      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.400")(props),
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word",
      },
      "#__next": {
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        flexDirection: "column"
      },
      hr: {
        borderColor: mode("gray.700", "whiteAlpha.900")(props),
      },
      pre: {
        overflowX: "auto",
      },
    }),
  },
});

export default theme;
