import React, { Fragment, useState, useEffect, useRef } from "react";
import type { NextPage } from "next";

import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import {
  Container,
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
import InputBox from "components/widgets/InputBox";
import InputTextArea from "components/widgets/InputTextArea";
import InputBoxWithSelect from "components/widgets/InputBoxWithSelect";
import AvatarUpload from "components/widgets/AvatarUpload";
import AccountQuestionBar from "components/AccountQuestionBar";
import PremiumCard from "components/PremiumCard";
import Stepper from "components/widgets/Stepper";

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

const AccountToEdit: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { jwt, user, error } = useSelector(
    (state: OurStore) => state.authReducer
  );

  const [activeStep, setActiveStep] = useState<number>(2);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Account" />

        <HStack spacing={6} align="start">
          {breakpointValue === "md" && (
            <Box w="40%">
              <AvatarUpload />
            </Box>
          )}
          <Box w="full">
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
              <HStack>
                <Text minW="max-content" fontSize="12px" fontWeight="600">
                  USER DETAILS
                </Text>
                {user.role === "premium" && (
                  <Flex w="full" justifyContent="center">
                    <Stepper activeStep={activeStep} />
                  </Flex>
                )}
              </HStack>
              <Divider mt={6} />
              {activeStep === 1 && (
                <Step1Form
                  user={user}
                  error={error}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              )}
              {activeStep === 2 && (
                <Step2Form
                  user={user}
                  error={error}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              )}
              {activeStep === 3 && (
                <Step3Form
                  user={user}
                  error={error}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
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

const Step1Form = ({ user, error, activeStep, setActiveStep }) => {
  const dispatch: MyThunkDispatch = useDispatch();
  const { countries, regions, districts, subDistricts, villages } = useSelector(
    (state: OurStore) => state.locationReducer
  );

  const [firstname, setFirstname] = useState<string | null>(user.firstName);
  const [lastname, setLastname] = useState<string | null>(user.lastName);

  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedGraduatedIn, setSelectedGraduatedIn] = useState(null);
  const [university, setUniversity] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<Country>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] =
    useState<SubDistrict>(null);
  const [selectedVillage, setSelectedVillage] = useState<Village>(null);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSelf, setIsSelf] = useState(true);

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
    firstname: yup.string().nullable().required("First Name is required."),
    lastname: yup.string().nullable().required("Last Name is required."),
    degree: yup.object().nullable(),
    graduatedIn: yup.object().nullable(),
    university: yup.string().nullable(),
    country: yup.object().nullable().required("Country must be selected."),
    region: yup.object().nullable().required("Region must be selected."),
    district: yup.object().nullable().required("District must be selected."),
    subDistrict: yup.object().nullable().required("Upazila must be selected."),
    village: yup.object().nullable().required("Village must be selected."),
  });

  return (
    <Formik
      initialValues={{
        firstname: firstname,
        lastname: lastname,
        degree: selectedDegree,
        graduatedIn: selectedGraduatedIn,
        university: university,
        country: selectedCountry,
        region: selectedRegion,
        district: selectedDistrict,
        subDistrict: selectedSubDistrict,
        village: selectedVillage,
      }}
      enableReinitialize={true}
      validationSchema={step1Schema}
      onSubmit={async (values, actions) => {
        const body = {
          type: "json",
          uuid: user.uuid,
          general: { firstname, lastname },
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
        };
        actions.setSubmitting(true);
        await dispatch(submit(body));
        if (!error) setActiveStep(activeStep + 1);
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
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Text fontSize="13px" textDecoration="underline" mt={6} mb={4}>
                General information
              </Text>
              <InputBox
                id="firstname"
                label="First name"
                onChange={setFirstname}
                isRequired={true}
                isInvalid={!!errors.firstname}
                error={errors.firstname}
              />
              <InputBox
                id="lastname"
                label="Last name"
                onChange={setLastname}
                isRequired={true}
                isInvalid={!!errors.lastname}
                error={errors.lastname}
              />

              <Text fontSize="13px" textDecoration="underline" mt={8} mb={4}>
                Where do you live?
              </Text>
              <InputBoxWithSelect
                id="country"
                label="Country"
                options={countries}
                optionLabel={({ name }) => name}
                selectedOption={selectedCountry}
                setSelectedOption={setSelectedCountry}
                isRequired={true}
                isInvalid={!selectedCountry}
                error={errors.country}
              />
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
            </Box>

            <Box>
              <Text fontSize="13px" textDecoration="underline" my={4}>
                About your education
              </Text>

              <InputBoxWithSelect
                id="graduatedIn"
                label="Graduated in"
                options={countries}
                optionLabel={({ name }) => name}
                selectedOption={selectedGraduatedIn}
                setSelectedOption={setSelectedGraduatedIn}
                isRequired={false}
                isInvalid={!selectedGraduatedIn}
                error={errors.graduatedIn}
              />

              <InputBox
                id="university"
                label="University"
                onChange={setUniversity}
                isRequired={false}
                isInvalid={!!errors.university}
                error={errors.university}
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

              <InputBoxWithSelect
                id="degree"
                label="Profession"
                options={degrees}
                optionLabel={({ label }) => label}
                selectedOption={selectedDegree}
                setSelectedOption={setSelectedDegree}
                isRequired={false}
                isInvalid={!selectedDegree}
                error={errors.degree}
              />

              {user.role !== "premium" && (
                <Box mt={12}>
                  <PremiumCard />
                </Box>
              )}
              {user.role === "premium" && (
                <Box mt={8}>
                  <Text fontSize="12px" color="GrayText" mt={4}>
                    Please complete 2nd, 3rd part of your profile pages now.
                  </Text>
                  <Text fontSize="12px" color="GrayText" my={1}>
                    or
                  </Text>
                  <Text fontSize="12px" color="GrayText">
                    Please ask assitance from admin team for the completion.
                  </Text>
                  <Box mt={4}>
                    <AccountQuestionBar
                      question="Do you want admin team write your profile?"
                      isTrue={isSelf}
                      setIsTrue={setIsSelf}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </SimpleGrid>

          <HStack spacing={4} w={{ base: "100%", md: "50%" }} mt={10}>
            {user.role === "premium" && activeStep >= 2 && (
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

const Step2Form = ({ user, error, activeStep, setActiveStep }) => {
  const dispatch: MyThunkDispatch = useDispatch();

  const [aboutMe, setAboutMe] = useState(null);

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
        const body = {
          type: "json",
          uuid: user.uuid,
          aboutMe: aboutMe,
        };
        actions.setSubmitting(true);
        await dispatch(submit(body));
        if (!error) setActiveStep(activeStep + 1);
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
              onChange={setAboutMe}
              isRequired={true}
              isInvalid={!!errors.aboutMe}
              error={errors.aboutMe}
            />
          

          <HStack spacing={4} w={{ base: "100%", md: "50%" }} mt={10}>
            {user.role === "premium" && activeStep >= 2 && (
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

const Step3Form = ({ user, error, activeStep, setActiveStep }) => {
  const dispatch: MyThunkDispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);

  const mediaRefs = useRef([]);
  const [medias, setMedias] = useState(Array(6).fill(null));
  const [mediaURLs, setMediaURLs] = useState(Array(6).fill(null));
  const [refresh, setRefresh] = useState(false);

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

        Promise.resolve(dispatch(submit(body)));
      })
    ).then((values) => {
      console.log(values); // [3, 1337, "foo"]
      setIsUploading(false);
    });
  };

  return (
    <Fragment>
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
        {user.role === "premium" && activeStep >= 2 && (
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
          w="50%"
          bgColor="purpleTone"
          fontSize="12px"
          fontWeight="400"
          color="white"
          _focus={{ boxShadow: "none" }}
          isLoading={isUploading}
          onClick={() => uploadToServer()}
        >
          SAVE
        </Button>
      </HStack>
    </Fragment>
  );
};

export default AccountToEdit;
