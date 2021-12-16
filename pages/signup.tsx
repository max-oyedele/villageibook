import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
  Center,
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
  Progress,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";

import { Status } from "rdx/types";

import Logo from "components/Logo";

import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const Signup = () => {
  const router = useRouter();
  const [passwordShow, setPasswordShow] = useState(false);
  const [cPasswordShow, setCPasswordShow] = useState(false);

  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "md",
  });
  const toast = useToast();

  const { signupMe, authStatus, authError } = useFetchData();
  const { authReset, doSignup } = useActionDispatch();

  useEffect(() => {
    authReset();
  }, []);

  useEffect(() => {
    if (signupMe) {
      !toast.isActive("signupMe") &&
      toast({
        id: "signupMe",
        title: "Account created successfully!",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/accountregister");
    }
  }, [signupMe]);
  
  useEffect(() => {
    if (authError) {
      !toast.isActive("authError") &&
        toast({
          id: "signupError",
          title: "Signup Failed!",
          description: authError.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    }
  }, [authError])
  
  const signupSchema = yup.object({
    firstname: yup.string().required("First Name is required."),
    lastname: yup.string().required("Last Name is required."),
    email: yup
      .string()
      .email("Provide correct Email address.")
      .required("Email address is required."),
    password: yup.string().required("Password is required."),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match.")
      .required("Confirm password is required."),
  });

  return (
    <Fragment>
      {authStatus === Status.LOADING && (
        <Box w="full" pos="fixed" top={0}>
          <Progress h="2px" size="xs" isIndeterminate />
        </Box>
      )}
      <Center
        w="full"
        bgColor={{base: "white", md: "transparent"}}
        pos={{base: "static", md: "absolute"}}
        top="20px"
        left="20px"
        py={{base: 6, md: 0}}
      >
        <Logo />
      </Center>
      <SimpleGrid h="100vh" columns={{ base: 1, md: 2 }}>
        <Box bgColor={{ base: "white", md: "grayBg" }}>
          <Center h="full" px={6}>
            <Image
              src="/images/logo-img.svg"
              fit="cover"
              alt="login"
              w="full"
            />
          </Center>
        </Box>

        <Box
          w="full"
          h="full"
          bgColor="white"
          padding={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"          
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
              color="GrayText"
              textAlign={{ base: "center", md: "left" }}
              mt={6}
            >
              Create account to start using VillageiBook
            </Text>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                cpassword: "",
              }}
              validationSchema={signupSchema}
              onSubmit={async (values, actions) => {
                // console.log({ values, actions });
                actions.setSubmitting(true);
                await doSignup({...values, roles: ['GENERAL']});
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
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={8}>
                    <FormControl
                      id="firstname"
                      isRequired
                      isInvalid={errors.firstname && touched.firstname}
                    >
                      <FormLabel fontSize="11px" color="GrayText">
                        Firstname
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="Add Your First Name"
                        fontSize="13px"
                        name="firstname"
                        onChange={handleChange}
                      />
                      <FormHelperText></FormHelperText>
                      <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id="lastname"
                      isRequired
                      isInvalid={errors.lastname && touched.lastname}
                    >
                      <FormLabel fontSize="11px" color="GrayText">
                        Lastname
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="Add Your Last Name"
                        fontSize="13px"
                        name="lastname"
                        onChange={handleChange}
                      />
                      <FormHelperText></FormHelperText>
                      <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>
                  <FormControl
                    id="email"
                    mt={4}
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

                  <FormControl
                    id="cpassword"
                    mt={4}
                    isRequired
                    isInvalid={errors.cpassword && touched.cpassword}
                  >
                    <FormLabel fontSize="11px" color="GrayText">
                      Confirm Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={cPasswordShow ? "text" : "password"}
                        placeholder="Add Your Password"
                        fontSize="13px"
                        name="cpassword"
                        onChange={handleChange}
                      />
                      <InputRightAddon
                        onClick={() => setCPasswordShow(!cPasswordShow)}
                      >
                        {cPasswordShow ? <BiHide /> : <BiShow />}
                      </InputRightAddon>
                    </InputGroup>
                    <FormHelperText></FormHelperText>
                    <FormErrorMessage>{errors.cpassword}</FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    bgColor="purpleTone"
                    color="white"
                    size="md"
                    fontSize="12px"
                    fontWeight="400"
                    _focus={{ boxShadow: "none" }}
                    w="full"
                    mt={8}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    SIGNUP
                  </Button>
                </Form>
              )}
            </Formik>

            <HStack justifyContent={{ base: "center", md: "right" }} mt={6}>
              <Text fontSize="12px" lineHeight={0}>
                Already have an account?
              </Text>
              <Text display="inline" color="purpleTone" lineHeight={0}>
                <Link href="/login">Login</Link>
              </Text>
            </HStack>
          </Flex>
        </Box>

      </SimpleGrid>
    </Fragment>
  );
};

export default Signup;
