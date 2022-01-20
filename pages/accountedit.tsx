import React, { Fragment, useState, useEffect, useRef } from "react";
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
  Image,
  SimpleGrid,
  AspectRatio,
  Button,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";

import { Formik, Form } from "formik";
import * as yup from "yup";

import { Status, Step } from "rdx/types";

import useFetchData from "hooks/use-fetch-data";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import InputBox from "components/widgets/InputBox";
import InputTextArea from "components/widgets/InputTextArea";
import InputBoxWithSelect from "components/widgets/InputBoxWithSelect";
import AvatarUpload from "components/widgets/AvatarUpload";
import AccountQuestionBar from "components/AccountQuestionBar";
import PremiumCard from "components/PremiumCard";
import Stepper from "components/widgets/Stepper";

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

import useActionDispatch from "hooks/use-action-dispatch";

const AccountToEdit: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const toast = useToast();

  const [activeStep, setActiveStep] = useState<number>(1);

  const { me, step, accountStatus, accountError } = useFetchData();
  const { updateReset, fetchMeData } = useActionDispatch();

  useEffect(() => {
    fetchMeData();
  }, []);

  useEffect(() => {
    if (accountStatus === Status.SUCCESS) {
      if (step === Step.STEP2 && isBySupport) {
        !toast.isActive("byAdminTeam") &&
          toast({
            id: "byAdminTeam",
            title: "Thank you!",
            description:
              "One staff of our admin team will reach out to you soon via email.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
      } else {
        !toast.isActive("updateMe") &&
          toast({
            id: "updateMe",
            title: "Successfully Updated.",
            description: "Updated",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

        setActiveStep(2);
      }
      
      updateReset()
    }

    if (accountError) {
      !toast.isActive("accountError") &&
        toast({
          id: "accountError",
          title: "Can't find you. Please try again.",
          description: accountError.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    }
  }, [accountStatus, accountError, step]);

  const [avatar, setAvatar] = useState(null);

  const [isBySupport, setIsBySupport] = useState(false);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        {/* <PageTitle title="Account" /> */}

        <HStack spacing={6} align="start" mt={8}>
          {breakpointValue === "md" && (
            <Box w="40%">
              <AvatarUpload avatarUrl={me?.avatar} setAvatar={setAvatar} />
            </Box>
          )}
          <Box w="full">
            {breakpointValue === "base" && (
              <Box mb={6}>
                <AvatarUpload avatarUrl={me?.avatar} setAvatar={setAvatar} />
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
              <HStack>
                <Text minW="max-content" fontSize="12px" fontWeight="600">
                  USER DETAILS
                </Text>
                {me?.roles?.includes("PREMIUM") && (
                  <Flex w="full" justifyContent="center">
                    <Stepper activeStep={activeStep} />
                  </Flex>
                )}
              </HStack>
              <Divider mt={6} />
              {activeStep === 1 && (
                <Step1Form
                  avatar={avatar}
                  isBySupport={isBySupport}
                  setIsBySupport={setIsBySupport}
                />
              )}
              {activeStep === 2 && (
                <Step2Form
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  avatar={avatar}
                />
              )}
            </Flex>
          </Box>
        </HStack>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

const Step1Form = ({ avatar, isBySupport, setIsBySupport }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const {
    me,    
    countries,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    degrees: degreeStrs,
  } = useFetchData();
  const {    
    fetchCommonData,
    fetchRegionsData,
    fetchDistrictsData,
    fetchSubDistrictsData,
    fetchVillagesData,
    submitStepOneData,
  } = useActionDispatch();

  const platformCountries = [
    {
      id: 0,
      name: "Bangladesh",
      href: "bangladesh",
      uuid: "",
    },
  ];

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [selectedProfession, setSelectedProfession] =
    useState<Profession | null>(null);
  const [degrees, setDegrees] = useState<Degree[]>([]);
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

  useEffect(() => {
    fetchCommonData();
    // fetchRegionsData(null);
    fetchDistrictsData(null);
    fetchSubDistrictsData(null);
    fetchVillagesData(null);
  }, []);

  useEffect(() => {
    if (me) {
      setFirstName(me.firstName);
      setLastName(me.lastName);

      if (countries?.length > 0) {
        setSelectedLivingCountry(
          countries.find((e) => e.uuid === me.livesIn?.uuid)
        );
      }
      if (districts?.length > 0 && !selectedDistrict) {
        setSelectedDistrict(
          districts.find((e) => e.uuid === me.comesFrom?.district?.uuid) ?? null
        );
      }
      if (subDistricts?.length > 0 && !selectedSubDistrict) {
        setSelectedSubDistrict(
          subDistricts.find(
            (e) => e.uuid === me.comesFrom?.subDistrict?.uuid
          ) ?? null
        );
      }
      if (villages?.length > 0 && !selectedVillage) {
        setSelectedVillage(
          villages.find((e) => e.uuid === me.comesFrom?.uuid) ?? null
        );
      }
      if (universities) {
        setSelectedUniversity(
          universities.find((e) => e.uuid === me.graduatedAt?.uuid)
        );
      }
      if (professions) {
        setSelectedProfession(
          professions.find((e) => e.uuid === me.hasProfession?.uuid)
        );
      }
      if (degreeStrs) {
        const tDgrees = degreeStrs.map((e, index) => ({
          id: index,
          name: e,
          href: e.toLowerCase(),
          uuid: index.toString(), //temp
        }));
        setDegrees(tDgrees);
        setSelectedDegree(tDgrees.find((e) => e.name === me?.degree));
      }
    }
  }, [
    me,
    countries,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    degreeStrs,
  ]);

  useEffect(() => {
    if (selectedCountry) {
      setSelectedRegion(null);
      fetchRegionsData({ country: selectedCountry });
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedRegion) {
      setSelectedDistrict(null);
      fetchDistrictsData({ region: selectedRegion });
    }
  }, [selectedRegion]);
  useEffect(() => {
    if (selectedDistrict) {
      setSelectedSubDistrict(null);
      fetchSubDistrictsData({ district: selectedDistrict });
    }
  }, [selectedDistrict]);
  useEffect(() => {
    if (selectedSubDistrict) {
      // setSelectedVillage(null);
      // fetchVillagesData({ subDistrict: selectedSubDistrict }); // this is not correctly working in backend for now
    }
  }, [selectedSubDistrict]);

  const step1Schema = yup.object({
    firstName: yup.string().nullable().required("First Name is required."),
    lastName: yup.string().nullable().required("Last Name is required."),
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
  });

  return (
    <Formik
      initialValues={{
        firstName: firstName,
        lastName: lastName,
        university: selectedUniversity,
        profession: selectedProfession,
        degree: selectedDegree,
        country: selectedCountry,
        // region: selectedRegion,
        district: selectedDistrict,
        subDistrict: selectedSubDistrict,
        village: selectedVillage,
        livingCountry: selectedLivingCountry,
      }}
      enableReinitialize={true}
      validationSchema={step1Schema}
      onSubmit={async (values, actions) => {
        const params = {
          firstName,
          lastName,
          avatar,
          comesFrom: selectedVillage.uuid,
          livesIn: selectedLivingCountry.uuid,
          graduatedAt: selectedUniversity?.uuid,
          degree: selectedDegree?.name,
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
          <Stack
            direction={breakpointValue === "base" ? "column" : "row"}
            spacing={8}
          >
            <Box w="full">
              <InputBox
                id="firstName"
                label="First Name"
                value={firstName ?? ""}
                onChange={(e) => setFirstName(e.target.value)}
                isRequired={true}
                isInvalid={!!errors.firstName}
                error={errors.firstName}
              />
              <InputBox
                id="lastName"
                label="Last Name"
                value={lastName ?? ""}
                onChange={(e) => setLastName(e.target.value)}
                isRequired={true}
                isInvalid={!!errors.lastName}
                error={errors.lastName}
              />

              <Text fontSize="11px" color="purpleTone" mt={8}>
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
              <Text fontSize="11px" color="purpleTone" mt={6}>
                About your education
              </Text>

              <InputBoxWithSelect
                id="graduatedAt"
                label="Graduated at"
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

              {!me?.roles?.includes("PREMIUM") && (
                <Box mt={12}>
                  <PremiumCard />
                </Box>
              )}
              {me?.roles?.includes("PREMIUM") && (
                <Box mt={8}>
                  <Text fontSize="11px" color="purpleTone">
                    For the Premium Page
                  </Text>

                  <Box mt={4}>
                    <AccountQuestionBar
                      question="Do you want admin team write your additional profile?"
                      isTrue={isBySupport}
                      setIsTrue={setIsBySupport}
                      yesTooltip="You will receive email and send back support team your additional data"
                      noTooltip="You might have to complete filling additional data yourself"
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Stack>

          <HStack spacing={4} w={{ base: "100%", md: "50%" }} mt={10}>
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
          </HStack>
        </Form>
      )}
    </Formik>
  );
};

const Step2Form = ({ activeStep, setActiveStep, avatar }) => {
  const { me } = useFetchData();
  const { submitStepTwoData } = useActionDispatch();

  const [about, setAbout] = useState(me.about);

  const photoRefs = useRef([]);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [photoURL1, setPhotoURL1] = useState(me.photo1 ?? null);
  const [photoURL2, setPhotoURL2] = useState(me.photo2 ?? null);
  const [photoURL3, setPhotoURL3] = useState(me.photo3 ?? null);

  const [refresh, setRefresh] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const uploadToClient = (event, index) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      if (index == 0) {
        setPhoto1(i);
        setPhotoURL1(URL.createObjectURL(i));
      } else if (index == 1) {
        setPhoto2(i);
        setPhotoURL2(URL.createObjectURL(i));
      } else if (index == 2) {
        setPhoto3(i);
        setPhotoURL3(URL.createObjectURL(i));
      }

      setRefresh(!refresh);
    }
  };

  const step2Schema = yup.object({
    about: yup.string().required("About me is required."),
  });

  return (
    <Formik
      initialValues={{
        about: about,
      }}
      enableReinitialize={true}
      validationSchema={step2Schema}
      onSubmit={async (values, actions) => {
        const params = {
          avatar,
          about,
          photo1,
          photo2,
          photo3,
        };
        actions.setSubmitting(true);
        await submitStepTwoData(params);
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
          <InputTextArea
            id="about"
            label="About Me"
            rows={10}
            value={about}
            onChange={setAbout}
            isRequired={true}
            isInvalid={!!errors.about}
            error={errors.about}
          />

          <Box>
            <Text fontSize="13px" textDecoration="underline" mt={6} mb={4}>
              Upload Photos (up to 3)
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {[1, 2, 3].map((e, index) => {
                const photoURL =
                  e == 1 ? photoURL1 : e == 2 ? photoURL2 : photoURL3;
                return (
                  <Box w="full" key={e}>
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={photoURL ?? "/images/default-photo.jpg"}
                        w="full"
                        fit="cover"
                        cursor="pointer"
                        onClick={() => photoRefs.current[index].click()}
                        alt=""
                      />
                    </AspectRatio>
                    <input
                      ref={(el) => (photoRefs.current[index] = el)}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => uploadToClient(e, index)}
                    />
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>

          <HStack spacing={4} w={{ base: "100%", md: "50%" }} mt={10}>
            {me?.roles?.includes("PREMIUM") && activeStep == 2 && (
              <Button
                type="submit"
                w="50%"
                fontSize="12px"
                fontWeight="400"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                PREV
              </Button>
            )}

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
          </HStack>
        </Form>
      )}
    </Formik>
  );
};

export default AccountToEdit;
