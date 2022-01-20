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
  useToast,
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

import { Status, Step } from "rdx/types";

const AccountToRegister: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const toast = useToast();
  const router = useRouter();

  const {
    me,
    step,
    accountStatus,
    accountError,
    countries,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    degrees: degreeStrs,
  } = useFetchData();
  const {
    updateReset,
    fetchCommonData,
    fetchRegionsData,
    fetchDistrictsData,
    fetchSubDistrictsData,
    fetchVillagesData,
    fetchUniversitiesData,
    fetchMeData,
    submitStepOneData,
  } = useActionDispatch();

  useEffect(() => {
    fetchCommonData();
    fetchVillagesData(null); //remove later

    const access_token = getUserToken();
    if (access_token) {
      fetchMeData();
    }
  }, []);

  useEffect(()=>{
    if(me?.livesIn.uuid && me?.comesFrom.uuid){
      // already have registered fields
      router.push('/feed');
    }
  }, [me])

  const platformCountries = [
    {
      id: 0,
      name: "Bangladesh",
      href: "bangladesh",
      uuid: "",
    },
  ];

  const [avatar, setAvatar] = useState(null);

  const [selectedLivingCountry, setSelectedLivingCountry] =
    useState<Country>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    platformCountries[0]
  );
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] =
    useState<SubDistrict>(null);
  const [selectedVillage, setSelectedVillage] = useState<Village>(null);
  const [selectedGraduatedIn, setSelectedGraduatedIn] = useState<Country>(null);
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [selectedProfession, setSelectedProfession] =
    useState<Profession | null>(null);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);

  useEffect(() => {
    if (accountStatus === Status.SUCCESS) {
      if (step === Step.STEP2) {      
        !toast.isActive("registerMe") &&
          toast({
            id: "registerMe",
            title: "Welcome being a Skillhet member!",
            description: "Successfully registered.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          router.push("/feed");          
      }

      updateReset();
    }
    if (accountError) {
      !toast.isActive("accountError") &&
        toast({
          id: "accountError",
          title: "Register Failed. Please try again.",
          description: accountError.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    }
  }, [accountStatus, accountError, step]);

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
  useEffect(() => {
    if (selectedGraduatedIn) {
      setSelectedUniversity(null);
      fetchUniversitiesData({ graduatedIn: selectedGraduatedIn });
    }
  }, [selectedGraduatedIn]);
  useEffect(() => {
    if (degreeStrs) {
      const tDgrees = degreeStrs.map((e, index) => ({
        id: index,
        name: e,
        href: e.toLowerCase(),
        uuid: index.toString(), //temp
      }));
      setDegrees(tDgrees);
    }
  }, [degreeStrs]);

  const accountSchema = yup.object({
    livingCountry: yup
      .object()
      .nullable()
      .required("Country must be selected."),
    country: yup.object().nullable().required("Country must be selected."),
    // region: yup.object().nullable().required("Region must be selected."),
    district: yup.object().nullable().required("District must be selected."),
    subDistrict: yup.object().nullable().required("Upazila must be selected."),
    village: yup.object().nullable().required("Village must be selected."),
    graduatedIn: yup.object().nullable(),
    university: yup.object().nullable(),
    profession: yup.object().nullable(),
    degree: yup.object().nullable(),
  });

  return (
    <Fragment>
      <HeaderForGuide title="Please Fill the Form below to complete your Signup." />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Account" />

        <Formik
          initialValues={{
            livingCountry: selectedLivingCountry,
            country: selectedCountry,
            // region: selectedRegion,
            district: selectedDistrict,
            subDistrict: selectedSubDistrict,
            village: selectedVillage,
            graduatedIn: selectedGraduatedIn,
            university: selectedUniversity,
            profession: selectedProfession,
            degree: selectedDegree,
          }}
          enableReinitialize={true}
          validationSchema={accountSchema}
          onSubmit={async (values, actions) => {
            const params = {
              avatar,
              livesIn: selectedLivingCountry.uuid,
              comesFrom: selectedVillage.uuid,
              university: selectedUniversity?.uuid,
              degree: selectedDegree?.href,
              profession: selectedProfession?.uuid,
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
                          label="Region"
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
                          id="graduatedIn"
                          label="Graduated in"
                          options={countries}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedGraduatedIn}
                          setSelectedOption={setSelectedGraduatedIn}
                          isClearable={true}
                          isRequired={false}
                          isInvalid={!selectedGraduatedIn}
                          error={errors.graduatedIn}
                        />

                        <InputBoxWithSelect
                          id="university"
                          label="University"
                          options={universities}
                          optionLabel={({ name }) => name}
                          selectedOption={selectedUniversity}
                          setSelectedOption={setSelectedUniversity}
                          isClearable={true}
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
                          isClearable={true}
                          isRequired={false}
                          isInvalid={!selectedProfession}
                          error={errors.profession}
                        />
                        {selectedUniversity && (
                          <InputBoxWithSelect
                            id="degree"
                            label="Degree"
                            options={degrees}
                            optionLabel={({ name }) => name}
                            selectedOption={selectedDegree}
                            setSelectedOption={setSelectedDegree}
                            isClearable={true}
                            isRequired={false}
                            isInvalid={!selectedDegree}
                            error={errors.degree}
                          />
                        )}
                      </Box>
                    </Stack>
                  </Flex>
                  <VStack mt={10} align={{ base: "center", md: "start" }}>
                    <Button
                      type="submit"
                      w="50%"
                      fontSize="12px"
                      fontWeight="400"
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
