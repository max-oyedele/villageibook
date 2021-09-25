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
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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
import {
  fetchCountries,
  fetchRegions,
  fetchDistricts,
  fetchSubDistricts,
  fetchVillages,
} from "rdx/slices/location";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import SelectBox from "components/widgets/SelectBox";
import AvatarUpload from "components/widgets/AvatarUpload";

import { Register } from "rdx/types";
import { submit } from "rdx/slices/auth";
import { Degree } from "types/schema";
import { Country, Region, District, SubDistrict, Village } from "types/schema";

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

const accountSchema = yup.object({
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

const AccountToEdit: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedGraduatedIn, setSelectedGraduatedIn] = useState(null);
  const [university, setUniversity] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<Country>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] =
    useState<SubDistrict>(null);
  const [selectedVillage, setSelectedVillage] = useState<Village>(null);
  const [avatar, setAvatar] = useState(null)

  const dispatch: MyThunkDispatch = useDispatch();
  const {
    jwt,
    register,
    user,
    error: authError,
  } = useSelector((state: OurStore) => state.authReducer);
  const { countries, regions, districts, subDistricts, villages } = useSelector(
    (state: OurStore) => state.locationReducer
  );

  const router = useRouter();
  const toast = useToast();
  const [cookie, setCookie] = useCookies(["jwt"]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  useEffect(() => {
    setSelectedRegion(null);
    dispatch(fetchRegions({ country: selectedCountry }));
  }, [selectedCountry]);
  useEffect(() => {
    setSelectedDistrict(null);
    dispatch(fetchDistricts({ region: selectedRegion }));
  }, [selectedRegion]);
  useEffect(() => {
    setSelectedSubDistrict(null);
    dispatch(fetchSubDistricts({ district: selectedDistrict }));
  }, [selectedDistrict]);
  useEffect(() => {
    setSelectedVillage(null);
    dispatch(fetchVillages({ subDistrict: selectedSubDistrict }));
  }, [selectedSubDistrict]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6} mb={48}>
        <PageTitle title="Account" />

        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword: "",
            degree: selectedDegree,
          }}
          validationSchema={accountSchema}
          onSubmit={async (values, actions) => {
            const avatarBody = new FormData();
            avatarBody.append("file", avatar);

            const body = {
              uuid: user.uuid,
              general: { firstname, lastname, email, password },
              education: {
                degree: selectedDegree,
                graduatedIn: selectedGraduatedIn,
                university: university,
              },
              location: {
                country: selectedCountry,
                region: selectedRegion,
                district: selectedDistrict,
                subDistrict: selectedSubDistrict,
                village: selectedVillage,
              },
              avatar: avatarBody
            };
            actions.setSubmitting(true);
            await dispatch(submit(body));
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
              <HStack spacing={6} align="start">
                <Box w="full">
                  {breakpointValue === "base" && <AvatarUpload setAvatar={setAvatar} />}
                  <Flex flexDirection="column" bgColor="white" p={6}>
                    <Text fontSize="12px" fontWeight="600">
                      USER DETAILS
                    </Text>
                    <Divider my={6} />
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                      <Box>
                        <Text fontSize="13px" mb={4}>
                          General information
                        </Text>
                        <InputBox label="First name" onChange={setFirstname} />
                        <InputBox label="Last name" onChange={setLastname} />
                        <InputBox label="Email" onChange={setEmail} />
                        <InputBox label="Password" onChange={setPassword} />
                      </Box>

                      <Box>
                        <Text fontSize="13px" mb={4}>
                          Education info
                        </Text>
                        <FormControl
                          id="degree"
                          isRequired
                          isInvalid={!selectedDegree}
                        >
                          <InputBoxWithSelect
                            id="degree"
                            label="Degree"
                            options={degrees}
                            optionLabel={({ label }) => label}
                            selectedOption={selectedDegree}
                            setSelectedOption={setSelectedDegree}
                          />
                          <FormHelperText></FormHelperText>
                          <FormErrorMessage>{errors.degree}</FormErrorMessage>
                        </FormControl>
                        <InputBoxWithSelect
                          id="graduatedIn"
                          label="Graduated in"
                          options={countries}
                          optionLabel={({ name }) => name}
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
                          id="country"
                          label="Country"
                          options={countries}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedCountry}
                          setSelectedOption={setSelectedCountry}
                        />
                        <InputBoxWithSelect
                          id="region"
                          label="Region"
                          options={regions}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedRegion}
                          setSelectedOption={setSelectedRegion}
                        />
                        <InputBoxWithSelect
                          id="district"
                          label="District"
                          options={districts}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedDistrict}
                          setSelectedOption={setSelectedDistrict}
                        />
                        <InputBoxWithSelect
                          id="subDistrict"
                          label="Upazila"
                          options={subDistricts}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedSubDistrict}
                          setSelectedOption={setSelectedSubDistrict}
                        />
                        <InputBoxWithSelect
                          id="village"
                          label="Village"
                          options={villages}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedVillage}
                          setSelectedOption={setSelectedVillage}
                        />
                        {/* <InputBox label="Village" onChange={setVillage} /> */}
                      </Box>
                    </SimpleGrid>
                  </Flex>
                  <HStack w={{ base: "100%", md: "50%" }} mt={10}>
                    <Button
                      type="submit"
                      w="50%"
                      bgColor="purpleTone"
                      fontSize="12px"
                      fontWeight="400"
                      color="white"
                      _focus={{ boxShadow: "none" }}
                      isLoading={isSubmitting}
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
                    <AvatarUpload setAvatar={setAvatar} />
                  </Box>
                )}
              </HStack>
            </Form>
          )}
        </Formik>
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
  id: string;
  label: string;
  options: any[];
  optionLabel: any;
  selectedOption: any;
  setSelectedOption: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({
  id,
  label,
  options,
  optionLabel,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <Fragment>
      <HStack mt={4}>
        <Text w="40%" fontSize="13px" fontWeight="400" color="GrayText">
          {label}
        </Text>
        <Box w="full">
          <SelectBox
            id={id}
            options={options}
            optionLabel={optionLabel}
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

export default AccountToEdit;
