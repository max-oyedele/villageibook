import React, { Fragment, useState, useEffect, useRef } from "react";
import type { NextPage } from "next";

import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import {
  Container,
  Stack,
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

import HeaderForGuide from "components/HeaderForGuide";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import InputBox from "components/widgets/InputBox";
import InputBoxWithSelect from "components/widgets/InputBoxWithSelect";
import InputBoxWithAutoComplete from "components/widgets/InputBoxWithAutoComplete";
import AvatarUpload from "components/widgets/AvatarUpload";

import { Register } from "rdx/types";
import { submit } from "rdx/slices/auth";
import { Country, Region, District, SubDistrict, Village } from "types/schema";

import { degrees, professions } from "constants/account";
import { platformCountry } from "constants/global";

const accountSchema = yup.object({
  degree: yup.object().nullable(),
  graduatedAt: yup.object().nullable(),
  university: yup.string().nullable(),
  profession: yup.string().nullable(),
  // residenceCountry: yup
  //   .object()
  //   .nullable()
  //   .required("Country must be selected."),
  region: yup.object().nullable().required("Region must be selected."),
  district: yup.object().nullable().required("District must be selected."),
  subDistrict: yup.object().nullable().required("Upazila must be selected."),
  village: yup.object().nullable().required("Village must be selected."),
  originCountry: yup.object().nullable().required("Country must be selected."),
  // originVillage: yup.object().nullable().required("Village must be selected."),
});

const AccountToRegister: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedGraduatedAt, setSelectedGraduatedAt] = useState(null);
  const [university, setUniversity] = useState<string | null>(null);
  const [profession, setProfession] = useState<string | null>(null);

  const [selectedResidenceCountry, setSelectedResidenceCountry] =
    useState<Country>(platformCountry);
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] =
    useState<SubDistrict>(null);
  const [selectedVillage, setSelectedVillage] = useState<Village>(null);
  const [selectedOriginCountry, setSelectedOriginCountry] =
    useState<Country>(null);
  const [selectedOriginVillage, setSelectedOriginVillage] =
    useState<Village>(null);

  const dispatch: MyThunkDispatch = useDispatch();
  const {
    jwt,
    register,
    user,
    error: authError,
  } = useSelector((state: OurStore) => state.authReducer);
  const { country, countries, regions, districts, subDistricts, villages } =
    useSelector((state: OurStore) => state.locationReducer);

  const router = useRouter();
  const toast = useToast();
  const [cookie, setCookie] = useCookies(["jwt"]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  useEffect(() => {
    setSelectedVillage(null);
    dispatch(fetchVillages({ country: selectedResidenceCountry }));
  }, [selectedResidenceCountry]);
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
      <HeaderForGuide title="Please Fill the Form below to complete your Signup." />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Account" />

        <Formik
          initialValues={{
            degree: selectedDegree,
            graduatedAt: selectedGraduatedAt,
            university: university,
            profession: profession,
            residenceCountry: selectedResidenceCountry,
            region: selectedRegion,
            district: selectedDistrict,
            subDistrict: selectedSubDistrict,
            village: selectedVillage,
            originCountry: selectedOriginCountry,
            originVillage: selectedOriginVillage,
          }}
          enableReinitialize={true}
          validationSchema={accountSchema}
          onSubmit={async (values, actions) => {
            // console.log({ values, actions });

            const body = {
              type: "json",
              uuid: user.uuid,
              education: {
                degree: selectedDegree,
                graduatedAt: selectedGraduatedAt,
                university: university,
              },
              residence: {
                country: selectedResidenceCountry,
                // region: selectedRegion,
                // district: selectedDistrict,
                // subDistrict: selectedSubDistrict,
                village: selectedVillage,
              },
              origin: {
                country: selectedOriginCountry,
              },
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
                {breakpointValue === "md" && (
                  <Box w="40%">
                    <AvatarUpload />
                  </Box>
                )}

                <Box w="full" mb={12}>
                  {breakpointValue === "base" && (
                    <Box mb={6}>
                      <AvatarUpload />
                    </Box>
                  )}
                  <Flex
                    flexDirection="column"
                    bgColor="white"
                    p={6}
                    border="1px"
                    borderRadius="8px"
                    borderColor="gray.200"
                  >
                    <Text fontSize="12px" fontWeight="600">
                      USER DETAILS
                    </Text>
                    <Divider my={6} />
                    <Stack
                      direction={breakpointValue === "base" ? "column" : "row"}
                      spacing={8}
                    >
                      <Box w="full">
                        <Text fontSize="11px" color="purpleTone" mb={4}>
                          Where do you live?
                        </Text>

                        {/* <InputBoxWithSelect
                          id="residenceCountry"
                          label="Country"
                          options={countries}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedResidenceCountry}
                          setSelectedOption={setSelectedResidenceCountry}
                          isRequired={true}
                          isInvalid={!selectedResidenceCountry}
                          error={errors.residenceCountry}
                        /> */}

                        <InputBoxWithSelect
                          id="region"
                          label="Division"
                          options={regions}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedRegion}
                          setSelectedOption={setSelectedRegion}
                          isRequired={true}
                          isInvalid={!selectedRegion}
                          error={errors.region}
                        />
                        <InputBoxWithSelect
                          id="district"
                          label="District"
                          options={districts}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedDistrict}
                          setSelectedOption={setSelectedDistrict}
                          isRequired={true}
                          isInvalid={!selectedDistrict}
                          error={errors.district}
                        />
                        <InputBoxWithSelect
                          id="subDistrict"
                          label="Upazila"
                          options={subDistricts}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedSubDistrict}
                          setSelectedOption={setSelectedSubDistrict}
                          isRequired={true}
                          isInvalid={!selectedSubDistrict}
                          error={errors.subDistrict}
                        />
                        <InputBoxWithSelect
                          id="village"
                          label="Village"
                          options={villages}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedVillage}
                          setSelectedOption={setSelectedVillage}
                          isRequired={true}
                          isInvalid={!selectedVillage}
                          error={errors.village}
                        />
                        

                        <Text fontSize="11px" color="purpleTone" mt={8}>
                          Where are you from?
                        </Text>

                        <InputBoxWithSelect
                          id="originCountry"
                          label="Country"
                          options={countries}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedOriginCountry}
                          setSelectedOption={setSelectedOriginCountry}
                          isRequired={true}
                          isInvalid={!selectedOriginCountry}
                          error={errors.originCountry}
                        />
                        {/* <InputBoxWithSelect
                          id="originVillage"
                          label="Village"
                          options={villages}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedOriginVillage}
                          setSelectedOption={setSelectedOriginVillage}
                          isRequired={true}
                          isInvalid={!selectedOriginVillage}
                          error={errors.originVillage}
                        /> */}
                        
                      </Box>
                      <Box w="full">
                        <Text fontSize="11px" color="purpleTone" mb={4}>
                          About your education
                        </Text>

                        <InputBoxWithSelect
                          id="graduatedAt"
                          label="Graduated at"
                          options={countries}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedGraduatedAt}
                          setSelectedOption={setSelectedGraduatedAt}
                          isRequired={false}
                          isInvalid={!selectedGraduatedAt}
                          error={errors.graduatedAt}
                        />

                        <InputBox
                          id="university"
                          label="University"
                          onChange={setUniversity}
                          isRequired={false}
                          isInvalid={!!errors.university}
                          error={errors.university}
                        />

                        <InputBox
                          id="profession"
                          label="Profession"
                          onChange={setProfession}
                          isRequired={false}
                          isInvalid={!!errors.profession}
                          error={errors.profession}
                        />

                        <InputBoxWithSelect
                          id="degree"
                          label="Degree"
                          options={degrees}
                          optionLabel={({ label }) => label}
                          selectedOption={selectedDegree}
                          setSelectedOption={setSelectedDegree}
                          isRequired={false}
                          isInvalid={!selectedDegree}
                          error={errors.degree}
                        />
                      </Box>
                    </Stack>
                  </Flex>
                  <VStack mt={10} align={{ base: "center", md: "start" }}>
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
                  </VStack>
                </Box>
              </HStack>
            </Form>
          )}
        </Formik>
      </Container>

      {/* <Box w="full" pos="fixed" bottom={0}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default AccountToRegister;
