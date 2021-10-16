import React, { Fragment, useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import cookieCutter from "cookie-cutter";

import {
  Container,
  Stack,
  HStack,
  VStack,
  Divider,
  StackDivider,
  Center,
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
  AspectRatio,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { MyThunkDispatch, OurStore } from "rdx/store";
import { fetchMe } from "rdx/slices/user";
import {
  fetchCountries,
  fetchRegions,
  fetchDistricts,
  fetchSubDistricts,
  fetchVillages,
  fetchUniversities,
} from "rdx/slices/location";
import { Register } from "rdx/types";

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

import { submitStepOne, submitStepTwo } from "rdx/slices/user";
import {
  Country,
  Region,
  District,
  SubDistrict,
  Village,
  University,
  Degree,
} from "types/schema";
import { degrees, professions } from "constants/account";
import { platformCountries } from "constants/global";
import { logout } from "rdx/slices/auth";

const AccountToEdit: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const dispatch: MyThunkDispatch = useDispatch();
  const { step, user, error } = useSelector(
    (state: OurStore) => state.userReducer
  );

  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    if (!error && step === Register.STEP2) setActiveStep(2);
  }, [error]);

  const [avatar, setAvatar] = useState(null);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        {/* <PageTitle title="Account" /> */}

        <HStack spacing={6} align="start" mt={8}>
          {breakpointValue === "md" && (
            <Box w="40%">
              <AvatarUpload avatarUrl={user?.avatar} setAvatar={setAvatar} />
            </Box>
          )}
          <Box w="full">
            {breakpointValue === "base" && (
              <Box mb={6}>
                <AvatarUpload avatarUrl={user?.avatar} setAvatar={setAvatar} />
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
                {/* {user?.role === "premium" && ( */}
                  <Flex w="full" justifyContent="center">
                    <Stepper activeStep={activeStep} />
                  </Flex>
                {/* )} */}
              </HStack>
              <Divider mt={6} />
              {activeStep === 1 && (
                <Step1Form
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  avatar={avatar}
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

const Step1Form = ({ activeStep, setActiveStep, avatar }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const dispatch: MyThunkDispatch = useDispatch();
  const { user } = useSelector((state: OurStore) => state.userReducer);
  const {
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
  } = useSelector((state: OurStore) => state.locationReducer);

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [profession, setProfession] = useState<string | null>(null);
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

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isBySupport, setIsBySupport] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchCountries());
      await dispatch(fetchVillages({}));
      await dispatch(fetchUniversities());

      let jwtFromCookie = cookieCutter.get("jwt");
      if (jwtFromCookie) {
        jwtFromCookie = JSON.parse(jwtFromCookie);
        dispatch(fetchMe({ access_token: jwtFromCookie.access_token }));
      } else {
        //logout()
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setSelectedVillage(villages.find((e) => e.name === user.comesFrom));
      setSelectedUniversity(
        universities.find((e) => e.name === user.graduatedAt)
      );
      setProfession(user.profession);
      setSelectedDegree(degrees.find((e) => e.name === user.degree));
    }
  }, [user]);

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
    // setSelectedVillage(null);
    // dispatch(fetchVillages({ subDistrict: selectedSubDistrict }));
  }, [selectedSubDistrict]);

  const step1Schema = yup.object({
    firstName: yup.string().nullable().required("First Name is required."),
    lastName: yup.string().nullable().required("Last Name is required."),
    university: yup.object().nullable(),
    profession: yup.string().nullable(),
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
    <Formik
      initialValues={{
        firstName: firstName,
        lastName: lastName,
        university: selectedUniversity,
        profession: profession,
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
      validationSchema={step1Schema}
      onSubmit={async (values, actions) => {
        const params = {
          firstName: firstName,
          lastName: lastName,
          avatar: avatar,
          comesFrom: selectedVillage.uuid,
          livesIn: selectedLivingCountry.uuid,
          graduatedAt: selectedUniversity?.uuid,
          profession: profession,
          degree: selectedDegree?.name,
        };

        actions.setSubmitting(true);
        await dispatch(submitStepOne(params));
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
                onChange={setFirstName}
                isRequired={true}
                isInvalid={!!errors.firstName}
                error={errors.firstName}
              />
              <InputBox
                id="lastName"
                label="Last Name"
                value={lastName ?? ""}
                onChange={setLastName}
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
                options={villages} //temp
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
                isRequired={false}
                isInvalid={!selectedUniversity}
                error={errors.university}
              />

              <InputBox
                id="profession"
                label="Profession"
                value={profession ?? ""}
                onChange={setProfession}
                isRequired={false}
                isInvalid={!!errors.profession}
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

              {/* {user?.role !== "premium" && (
                <Box mt={12}>
                  <PremiumCard />
                </Box>
              )} */}
              {/* {user?.role === "premium" && ( */}
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
              {/* )} */}
            </Box>
          </Stack>

          <HStack spacing={4} w={{ base: "100%", md: "50%" }} mt={10}>
            {/* {user?.role === "premium" && activeStep >= 2 && ( */}
            {activeStep >= 2 && (
              <Button
                type="submit"
                w="50%"
                bgColor="purpleTone"
                fontSize="12px"
                fontWeight="400"
                color="white"
                _focus={{ boxShadow: "none" }}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                PREV
              </Button>
            )}

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
          </HStack>
        </Form>
      )}
    </Formik>
  );
};

const Step2Form = ({ activeStep, setActiveStep, avatar }) => {
  const dispatch: MyThunkDispatch = useDispatch();
  const { user } = useSelector((state: OurStore) => state.userReducer);

  const [aboutMe, setAboutMe] = useState(null);

  const photoRefs = useRef([]);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [photoURL1, setPhotoURL1] = useState(user.photo1??null);
  const [photoURL2, setPhotoURL2] = useState(user.photo2??null);
  const [photoURL3, setPhotoURL3] = useState(user.photo3??null);

  const [refresh, setRefresh] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const uploadToClient = (event, index) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      if (index == 1) {
        setPhoto1(i);
        setPhotoURL1(URL.createObjectURL(i));
      } else if (index == 2) {
        setPhoto2(i);
        setPhotoURL2(URL.createObjectURL(i));
      } else if (index == 3) {
        setPhoto3(i);
        setPhotoURL3(URL.createObjectURL(i));
      }

      setRefresh(!refresh);
    }
  };

  const step2Schema = yup.object({
    aboutMe: yup.string().nullable().required("About me is required."),
  });

  return (
    <Formik
      initialValues={{
        aboutMe: aboutMe,
      }}
      enableReinitialize={true}
      validationSchema={step2Schema}
      onSubmit={async (values, actions) => {
        const params = {
          avatar: avatar,
          aboutMe: aboutMe,
          photo1: photo1,
          photo2: photo2,
          photo3: photo3,
        };
        actions.setSubmitting(true);
        await dispatch(submitStepTwo(params));
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
            id="aboutme"
            label="About Me"
            rows={10}
            onChange={setAboutMe}
            isRequired={true}
            isInvalid={!!errors.aboutMe}
            error={errors.aboutMe}
          />

          <Box>
            <Text fontSize="13px" textDecoration="underline" mt={6} mb={4}>
              Upload Photos (up to 3)
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {[1, 2, 3].map((e, index) => {
                const photoURL = e == 1 ? photoURL1 : e == 2 ? photoURL2 : photoURL3;
                return (
                  <Box w="full" key={e}>
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={photoURL ?? "/images/default-photo.jpg"}
                        w="full"
                        fit="cover"
                        cursor="pointer"
                        onClick={() => photoRefs.current[index].click()}
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
            {user?.role === "premium" && activeStep == 2 && (
              <Button
                type="submit"
                w="50%"
                bgColor="purpleTone"
                fontSize="12px"
                fontWeight="400"
                color="white"
                _focus={{ boxShadow: "none" }}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                PREV
              </Button>
            )}

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
          </HStack>
        </Form>
      )}
    </Formik>
  );
};

export default AccountToEdit;
