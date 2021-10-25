import React, { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";

import { useRouter } from "next/router";

import {
  Container,
  Stack,
  HStack,
  VStack,
  Divider,
  Flex,
  Box,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Formik, Form } from "formik";
import * as yup from "yup";

import {
  Country,
  Region,
  District,
  SubDistrict,
  Village,
  University,
  Profession,
  Degree,
} from "types/schema";

import HeaderForGuide from "components/HeaderForGuide";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import InputBoxWithSelect from "components/widgets/InputBoxWithSelect";
import AvatarUpload from "components/widgets/AvatarUpload";

import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

import { getUserToken } from "helpers/user-token";

import { degrees } from "constants/account";
import { platformCountries } from "constants/global";
import { Step } from "rdx/types";

const AccountToRegister: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const {
    me,
    meStep,
    countries,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    fetchCountriesData,
    fetchRegionsData,
    fetchDistrictsData,
    fetchSubDistrictsData,
    fetchVillagesData,
    fetchCommonData,
    fetchMeData,
  } = useFetchData();

  const { submitStepOneData } = useActionDispatch();

  useEffect(() => {
    fetchMeData();
  }, []);

  const [avatar, setAvatar] = useState(null);

  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [selectedProfession, setSelectedProfession] =
    useState<Profession | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    platformCountries[0]
  );
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] =
    useState<SubDistrict>(null);
  const [selectedVillage, setSelectedVillage] = useState<Village>(null);
  const [selectedLivingCountry, setSelectedLivingCountry] =
    useState<Country>(null);
  const [selectedLivingVillage, setSelectedLivingVillage] =
    useState<Village>(null);

  const router = useRouter();

  useEffect(() => {
    const access_token = getUserToken();
    if (access_token) {
      fetchMeData();
      fetchCommonData();
    } else {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    if (meStep === Step.STEP2) {
      router.push("/feed");
      return;
    }
  }, [meStep]);

  useEffect(() => {
    setSelectedRegion(null);
    fetchRegionsData({ country: selectedCountry });
  }, [selectedCountry]);
  useEffect(() => {
    setSelectedDistrict(null);
    fetchDistrictsData({ region: selectedRegion });
  }, [selectedRegion]);
  useEffect(() => {
    setSelectedSubDistrict(null);
    fetchSubDistrictsData({ district: selectedDistrict });
  }, [selectedDistrict]);
  useEffect(() => {
    // setSelectedVillage(null);
    // fetchVillagesData({ subDistrict: selectedSubDistrict });
  }, [selectedSubDistrict]);

  const accountSchema = yup.object({
    university: yup.object().nullable(),
    profession: yup.object().nullable(),
    degree: yup.object().nullable(),
    country: yup.object().nullable().required("Country must be selected."),
    // region: yup.object().nullable().required("Region must be selected."),
    district: yup.object().nullable().required("District must be selected."),
    subDistrict: yup.object().nullable().required("Upazila must be selected."),
    village: yup.object().nullable().required("Village must be selected."),
    livingCountry: yup
      .object()
      .nullable()
      .required("Country must be selected."),
    // livingVillage: yup.object().nullable().required("Village must be selected."),
  });

  return (
    <Fragment>
      <HeaderForGuide title="Please Fill the Form below to complete your Signup." />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Account" />

        <Formik
          initialValues={{
            university: selectedUniversity,
            profession: selectedProfession,
            degree: selectedDegree,
            country: selectedCountry,
            // region: selectedRegion,
            district: selectedDistrict,
            subDistrict: selectedSubDistrict,
            village: selectedVillage,
            livingCountry: selectedLivingCountry,
            // livingVillage: selectedLivingVillage,
          }}
          enableReinitialize={true}
          validationSchema={accountSchema}
          onSubmit={async (values, actions) => {
            // console.log({ values, actions });
            const params = {
              firstName: me.firstName,
              lastName: me.lastName,
              avatar,
              comesFrom: selectedVillage.uuid,
              livesIn: selectedLivingCountry.uuid,
              graduatedAt: selectedUniversity?.uuid,
              degree: selectedDegree?.name,
              profession: selectedProfession?.uuid
            };
            
            actions.setSubmitting(true);
            await submitStepOneData(params);
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
                    <AvatarUpload setAvatar={setAvatar} />
                  </Box>
                )}

                <Box w="full" mb={12}>
                  {breakpointValue === "base" && (
                    <Box mb={6}>
                      <AvatarUpload setAvatar={setAvatar} />
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
                        <Text fontSize="11px" color="purpleTone">
                          Where do you live?
                        </Text>

                        <InputBoxWithSelect
                          id="livingCountry"
                          label="Country"
                          options={countries}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedLivingCountry}
                          setSelectedOption={setSelectedLivingCountry}
                          isRequired={true}
                          isInvalid={!selectedLivingCountry}
                          error={errors.livingCountry}
                        />

                        {/* <InputBoxWithSelect
                          id="livingVillage"
                          label="Village"
                          options={villages}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedLivingVillage}
                          setSelectedOption={setSelectedLivingVillage}
                          isRequired={true}
                          isInvalid={!selectedLivingVillage}
                          error={errors.livingVillage}
                        /> */}

                        <Text fontSize="11px" color="purpleTone" mt={8}>
                          Where are you from?
                        </Text>

                        <InputBoxWithSelect
                          id="country"
                          label="Country"
                          options={platformCountries}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedCountry}
                          setSelectedOption={setSelectedCountry}
                          isRequired={true}
                          isInvalid={!selectedCountry}
                          error={errors.country}
                        />
                        {/* <InputBoxWithSelect
                          id="region"
                          label="Division"
                          options={regions}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedRegion}
                          setSelectedOption={setSelectedRegion}
                          isRequired={true}
                          isInvalid={!selectedRegion}
                          error={errors.region}
                        /> */}
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
                      </Box>

                      <Box w="full">
                        <Text fontSize="11px" color="purpleTone" mb={4}>
                          About your education
                        </Text>

                        <InputBoxWithSelect
                          id="graduatedAt"
                          label="Graduated at"
                          options={universities}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedUniversity}
                          setSelectedOption={setSelectedUniversity}
                          isRequired={false}
                          isInvalid={!selectedUniversity}
                          error={errors.university}
                        />

                        <InputBoxWithSelect
                          id="profession"
                          label="Profession"
                          options={professions}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedProfession}
                          setSelectedOption={setSelectedProfession}
                          isRequired={false}
                          isInvalid={!selectedProfession}
                          error={errors.profession}
                        />

                        <InputBoxWithSelect
                          id="degree"
                          label="Degree"
                          options={degrees}
                          optionLabel={({ name }) => name}
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
                      disabled={isSubmitting}
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
