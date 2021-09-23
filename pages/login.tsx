import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import { useSelector, useDispatch } from "react-redux";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import * as yup from "yup";

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
  useToast,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";

import Logo from "components/Logo";

import { MyThunkDispatch, OurStore } from "rdx/store";
import { login } from "rdx/slices/auth";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Provide correct Email address.")
    .required("Email address is required."),
  password: yup.string().required("Password is required."),
});

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const breakpointValue = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  const dispatch: MyThunkDispatch = useDispatch();
  const { jwt, status, user, error } = useSelector(
    (state: OurStore) => state.authReducer
  );

  const router = useRouter();
  const toast = useToast();
  const [cookie, setCookie] = useCookies(["jwt"]);
  useEffect(() => {
    if (error) {
      toast({
        title: "Login Failed!",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (jwt) {
      setCookie("jwt", JSON.stringify(jwt), {
        path: "/",
        maxAge: jwt.expires_in, // Expirey time in seconds
        sameSite: true,
      });
      router.push("/");
    }
  }, [jwt, error]);

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
          >
            <Text
              fontSize="36px"
              fontWeight="bold"
              textAlign={{ base: "center", md: "left" }}
              mt={{ base: 10, md: 0 }}
            >
              Login
            </Text>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={async (values, actions) => {
                // console.log({ values, actions });
                actions.setSubmitting(true);

                await dispatch(login(values));

                actions.setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                handleChange,
                handleSubmit,
              }) => (
                <Form noValidate>
                  <FormControl
                    id="email"
                    mt={8}
                    isRequired
                    isInvalid={errors.email && touched.email}
                  >
                    <FormLabel fontSize="11px" color="GrayText">
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      placeholder="Add Your Email Address"
                      fontSize="13px"
                      name="email"
                      onChange={handleChange}
                    />
                    <FormHelperText></FormHelperText>
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    id="password"
                    mt={4}
                    isRequired
                    isInvalid={errors.password && touched.password}
                  >
                    <FormLabel fontSize="11px" color="GrayText">
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={passwordShow ? "text" : "password"}
                        placeholder="Add Your Password"
                        fontSize="13px"
                        name="password"
                        onChange={handleChange}
                      />
                      <InputRightAddon
                        onClick={() => setPasswordShow(!passwordShow)}
                      >
                        {passwordShow ? <BiHide /> : <BiShow />}
                      </InputRightAddon>
                    </InputGroup>
                    <FormHelperText></FormHelperText>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    bgColor="purpleTone"
                    color="white"
                    size="md"
                    fontSize="12px"
                    fontWeight="400"
                    _focus={{boxShadow: "none"}}
                    w="full"
                    mt={8}
                    isLoading={isSubmitting}
                  >
                    LOGIN
                  </Button>
                </Form>
              )}
            </Formik>
            
            <Box textAlign={{ base: "center", md: "right" }}>
              <Text fontSize="12px" color="purpleTone" mt={4}>
                <Link href="/signup">Create Account</Link>
              </Text>
            </Box>
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
                ? "/images/login-back-mobile.png"
                : "/images/login-back-pc.png"
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

export default Login;
