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
  Degree,
} from "types/schema";
import { degrees, professions } from "constants/account";
import { platformCountries } from "constants/global";

const AccountToEdit: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  
  const dispatch: MyThunkDispatch = useDispatch();
  const { step, user, error } = useSelector(
    (state: OurStore) => state.userReducer
  );
  useEffect(() => {    
    let jwtFromCookie = cookieCutter.get("jwt");
    if(jwtFromCookie){
      jwtFromCookie = JSON.parse(jwtFromCookie);
      dispatch(fetchMe({ uuid: "879a1f43-d496-43eb-a658-648071820d31", access_token: jwtFromCookie.access_token }));
    }
  }, []);

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
              <AvatarUpload avatarUrl={user?.avatarUrl} setAvatar={setAvatar} />
            </Box>
          )}
          <Box w="full">
            {breakpointValue === "base" && (
              <Box mb={6}>
                <AvatarUpload
                  avatarUrl={user?.avatarUrl}
                  setAvatar={setAvatar}
                />
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
                {user?.role === "premium" && (
                  <Flex w="full" justifyContent="center">
                    <Stepper activeStep={activeStep} />
                  </Flex>
                )}
              </HStack>
              <Divider mt={6} />
              {activeStep === 1 && (
                <Step1Form
                  user={user}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  avatar={avatar}
                />
              )}
              {activeStep === 2 && (
                <Step2Form
                  user={user}
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

const Step1Form = ({ user, activeStep, setActiveStep, avatar }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const dispatch: MyThunkDispatch = useDispatch();
  const { country, countries, regions, districts, subDistricts, villages } =
    useSelector((state: OurStore) => state.locationReducer);

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  const [selectedGraduatedAt, setSelectedGraduatedAt] = useState<Country>(null);
  const [university, setUniversity] = useState<string | null>(null);
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
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setSelectedGraduatedAt(
        countries.find((e) => e.href === user?.graduatedAt)
      );
      setUniversity(user.university);
      setProfession(user.profession);
      setSelectedDegree(degrees.find((e) => e.name === user.degree));
    }
  }, [user]);

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

  const step1Schema = yup.object({
    firstName: yup.string().nullable().required("First Name is required."),
    lastName: yup.string().nullable().required("Last Name is required."),
    graduatedAt: yup.object().nullable(),
    university: yup.string().nullable(),
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
        graduatedAt: selectedGraduatedAt,
        university: university,
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
          uuid: user.uuid,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          password: user.password,
          avatar: avatar,
          comesFrom: selectedVillage.name,
          livesIn: selectedLivingCountry.name,
          graduatedAt: selectedGraduatedAt?.name,
          university: university,
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
              <Text fontSize="11px" color="purpleTone" mt={6}>
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
                value={university ?? ""}
                onChange={setUniversity}
                isRequired={false}
                isInvalid={!!errors.university}
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

              {user?.role !== "premium" && (
                <Box mt={12}>
                  <PremiumCard />
                </Box>
              )}
              {user?.role === "premium" && (
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
            {user?.role === "premium" && activeStep >= 2 && (
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

const Step2Form = ({ user, activeStep, setActiveStep, avatar }) => {
  const dispatch: MyThunkDispatch = useDispatch();

  const [aboutMe, setAboutMe] = useState(null);

  const mediaRefs = useRef([]);
  const [medias, setMedias] = useState(Array(6).fill(null));
  const [mediaURLs, setMediaURLs] = useState(Array(6).fill(null));
  const [refresh, setRefresh] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const uploadToClient = (event, index) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setMedias((medias) => {
        medias[index] = i;
        return medias;
      });
      setMediaURLs((mediaURLs) => {
        mediaURLs[index] = URL.createObjectURL(i);
        return mediaURLs;
      });
      setRefresh(!refresh);
    }
  };

  const uploadToServer = async () => {
    setIsUploading(true);
    Promise.all(
      medias.map((media) => {
        const mediaBody = new FormData();
        mediaBody.append("file", media);

        const body = {
          type: "media",
          uuid: user.uuid,
          media: mediaBody,
        };

        // Promise.resolve(dispatch(submitStepTwo(body)));
        Promise.resolve();
      })
    ).then((values) => {
      console.log(values); // [3, 1337, "foo"]
      setIsUploading(false);
    });
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
          uuid: user.uuid,
          email: user.email,
          password: user.password,
          avatar: avatar,
          aboutMe: aboutMe,
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
              {[1, 2, 3].map((e, index) => (
                <Box w="full" key={e}>
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={mediaURLs[index] ?? "/images/default-media.jpg"}
                      w="full"
                      fit="cover"
                      cursor="pointer"
                      onClick={() => mediaRefs.current[index].click()}
                    />
                  </AspectRatio>
                  <input
                    ref={(el) => (mediaRefs.current[index] = el)}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => uploadToClient(e, index)}
                  />
                </Box>
              ))}
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
