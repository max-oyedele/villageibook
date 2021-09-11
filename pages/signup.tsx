import { Fragment, useState } from "react";
import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
  HStack,
  Divider,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";

import Logo from "components/Logo";

const Signup = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const breakpointValue = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  return (
    <Fragment>
      <Box
        pos="absolute"
        top="20px"
        left="20px"
        visibility={{ base: "hidden", md: "visible" }}
      >
        <Logo />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box
          w="full"
          h="full"
          padding={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          order={{ base: 1, md: 0 }}
        >
          <Flex
            w={{ base: "80%", md: "100%", lg: "70%" }}
            flexDirection="column"
            my={{ base: 6, md: 0 }}
          >
            <Text
              fontSize="36px"
              fontWeight="bold"
              textAlign={{ base: "center", md: "left" }}
            >
              Sign Up
            </Text>
            <Text
              fontSize="14px"
              fontWeight="400"
              color="grayText"
              textAlign={{ base: "center", md: "left" }}
              mt={6}
            >
              Create account to start using VillageiBook
            </Text>

            <FormControl id="email" mt={8}>
              <FormLabel fontSize="11px" color="grayText">
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="Add Your Email Address"
                fontSize="13px"
              />
              <FormHelperText></FormHelperText>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl id="password" mt={4}>
              <FormLabel fontSize="11px" color="grayText">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={passwordShow ? "text" : "password"}
                  placeholder="Add Your Password"
                  fontSize="13px"
                />
                <InputRightAddon onClick={() => setPasswordShow(!passwordShow)}>
                  {passwordShow ? <BiHide /> : <BiShow />}
                </InputRightAddon>
              </InputGroup>
              <FormHelperText></FormHelperText>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl id="password" mt={4}>
              <FormLabel fontSize="11px" color="grayText">
                Repeat Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={passwordShow ? "text" : "password"}
                  placeholder="Add Your Password"
                  fontSize="13px"
                />
              </InputGroup>
              <FormHelperText></FormHelperText>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <Button
              colorScheme=""
              bgColor="purpleTone"
              size="md"
              fontSize="12px"
              fontWeight="800"
              mt={8}
            >
              SIGNUP
            </Button>

            <HStack spacing={2} mt={8}>
              <Divider />
              <Text color="grayText" fontSize="14px">
                or
              </Text>
              <Divider />
            </HStack>

            {breakpointValue === "base" && (
              <Text fontSize="12px" fontWeight="bold" textAlign="center" mt={4}>
                Signup with
              </Text>
            )}

            <HStack spacing={4} mt={{ base: 4, md: 8 }}>
              <Button
                w="full"
                fontSize="12px"
                border="1px"
                borderColor="#D5DBEC"
                leftIcon={
                  <Image
                    src="/icons/auth-facebook.svg"
                    width="17px"
                    height="17px"
                    alt="facebook"
                  />
                }
              >
                {breakpointValue === "base"
                  ? "Facebook"
                  : "Signup with Facebook"}
              </Button>
              <Button
                w="full"
                fontSize="12px"
                border="1px"
                borderColor="#D5DBEC"
                leftIcon={
                  <Image
                    src="/icons/auth-google.svg"
                    width="17px"
                    height="17px"
                    alt="google"
                  />
                }
              >
                {breakpointValue === "base" ? "Google" : "Signup with Google"}
              </Button>
            </HStack>
          </Flex>
        </Box>

        <Box
          w="full"
          h={{ base: "250px", md: "100vh" }}
          order={{ base: 0, md: 1 }}
        >
          <Image
            src={
              breakpointValue === "base"
                ? "/images/signup-back-mobile.png"
                : "/images/signup-back-pc.png"
            }
            boxSize="full"
            fit="cover"
            alt="login"
          />
        </Box>
      </SimpleGrid>
    </Fragment>
  );
};

export default Signup;
