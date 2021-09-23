import React, { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";

import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import {
  Container,
  HStack,
  VStack,
  Divider,
  Flex,
  Box,
  Text,
  Image,
  Avatar,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  SimpleGrid,
  Input,
  Button,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";

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

import { MyThunkDispatch, OurStore } from "rdx/store";
import { login, reset } from "rdx/slices/auth";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import SelectBox from "components/widgets/SelectBox";

import { Register } from "rdx/types";
import { Degree } from "types/data";

export const degrees: Degree[] = [
  {
    id: 0,
    label: "Master",
    value: "master",
  },
  {
    id: 1,
    label: "Bachelor's",
    value: "bachelor",
  },
];

const Account: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [selectedDegree, setSelectedDegree] = useState(null);

  const [selectedGraduatedIn, setSelectedGraduatedIn] = useState(null);
  const [university, setUniversity] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState(null);
  const [village, setVillage] = useState<string | null>(null);

  const dispatch: MyThunkDispatch = useDispatch();
  const { jwt, register, user, error } = useSelector(
    (state: OurStore) => state.authReducer
  );
  const { countries, regions, districts, subDistricts, villages } = useSelector(
    (state: OurStore) => state.locationReducer
  );

  const router = useRouter();
  const toast = useToast();
  const [cookie, setCookie] = useCookies(["jwt"]);
  useEffect(() => {
    if (register === Register.COMPLETED) {
      toast({
        title: "Account created successfully!",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch(reset());
      router.push("/login");
    }
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
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Account" />

        <HStack spacing={6} align="start">
          <Box w="full">
            {breakpointValue === "base" && <AvatarUpload />}
            <Flex flexDirection="column" bgColor="white" p={6}>
              <Text fontSize="12px" fontWeight="600">
                USER DETAILS
              </Text>
              <Divider my={6} />
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                {register === Register.COMPLETED && (
                  <Box>
                    <Text fontSize="13px" mb={4}>
                      General information
                    </Text>
                    <InputBox label="First name" onChange={setFirstname} />
                    <InputBox label="Last name" onChange={setLastname} />
                    <InputBox label="Email" onChange={setEmail} />
                    <InputBox label="Password" onChange={setPassword} />
                  </Box>
                )}
                <Box>
                  <Text fontSize="13px" mb={4}>
                    Education info
                  </Text>
                  <InputBoxWithSelect
                    label="Degree"
                    options={degrees}
                    selectedOption={selectedDegree}
                    setSelectedOption={setSelectedDegree}
                  />
                  <InputBoxWithSelect
                    label="Graduated in"
                    options={countries}
                    selectedOption={selectedGraduatedIn}
                    setSelectedOption={setSelectedDegree}
                  />
                  <InputBox label="University" onChange={setUniversity} />
                </Box>
                <Box>
                  <Text fontSize="13px" mb={4}>
                    Location
                  </Text>
                  <InputBoxWithSelect
                    label="Country"
                    options={countries}
                    selectedOption={selectedCountry}
                    setSelectedOption={setSelectedCountry}
                  />
                  <InputBoxWithSelect
                    label="Region"
                    options={regions}
                    selectedOption={selectedRegion}
                    setSelectedOption={setSelectedRegion}
                  />
                  <InputBoxWithSelect
                    label="District"
                    options={districts}
                    selectedOption={selectedDistrict}
                    setSelectedOption={setSelectedDistrict}
                  />
                  <InputBoxWithSelect
                    label="Upazila"
                    options={subDistricts}
                    selectedOption={selectedSubDistrict}
                    setSelectedOption={setSelectedSubDistrict}
                  />
                  <InputBox label="Village" onChange={setVillage} />
                </Box>
              </SimpleGrid>
            </Flex>
            <HStack w={{ base: "100%", md: "50%" }} mt={10}>
              <Button
                w="50%"
                bgColor="purpleTone"
                fontSize="12px"
                fontWeight="400"
                color="white"
                _focus={{ boxShadow: "none" }}
              >
                SAVE
              </Button>
              <Button
                w="50%"
                bgColor="transparent"
                fontSize="12px"
                fontWeight="400"
                color="purpleTone"
                variant="ghost"
                _focus={{ boxShadow: "none" }}
              >
                CANCEL
              </Button>
            </HStack>
          </Box>

          {breakpointValue === "md" && (
            <Box w="40%">
              <AvatarUpload />
            </Box>
          )}
        </HStack>
      </Container>

      <Box w="full" pos="fixed" bottom={0}>
        <Footer />
      </Box>
    </Fragment>
  );
};

const InputBox: React.FC<{
  label: string;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ label, onChange }) => {
  return (
    <Fragment>
      <HStack mt={4}>
        <Text w="40%" fontSize="13px" color="GrayText">
          {label}
        </Text>
        <Box w="full">
          <Input onChange={(e) => onChange(e.target.value)} />
        </Box>
      </HStack>
    </Fragment>
  );
};

const InputBoxWithSelect: React.FC<{
  label: string;
  options: any[];
  selectedOption: any;
  setSelectedOption: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ label, options, selectedOption, setSelectedOption }) => {
  return (
    <Fragment>
      <HStack mt={4}>
        <Text w="40%" fontSize="13px" fontWeight="400" color="GrayText">
          {label}
        </Text>
        <Box w="full">
          <SelectBox
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            width="full"
            height="40px"
          />
        </Box>
      </HStack>
    </Fragment>
  );
};

const AvatarUpload = () => {
  return (
    <Fragment>
      <Flex flexDirection="column" bgColor="white" p={6}>
        <Text fontSize="12px" fontWeight="600">
          AVATAR
        </Text>
        <Divider my={6} />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src="/icons/upload-avatar.svg"
            w="80px"
            h="80px"
            alt=""
            mt={8}
          />
          <Button
            h="25px"
            color="purpleTone"
            fontSize="12px"
            fontWeight="400"
            border="1px"
            borderColor="gray.300"
            borderRadius="full"
            _focus={{ boxShadow: "none" }}
            mt={8}
          >
            UPLOAD AVATAR
          </Button>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default Account;
