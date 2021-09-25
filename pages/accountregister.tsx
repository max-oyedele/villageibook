import React, { Fragment, useState, useEffect, useRef } from "react";
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

import HeaderForRegister from "components/HeaderForRegister";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import SelectBox from "components/widgets/SelectBox";
import AvatarUpload from "components/widgets/AvatarUpload";

import { Register } from "rdx/types";
import { submit } from "rdx/slices/auth";
import { Degree } from "types/schema";
import { Country, Region, District, SubDistrict, Village } from "types/schema";
import { filterUndefined } from "@chakra-ui/react-utils/node_modules/@chakra-ui/utils";

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
  degree: yup.object().nullable(),
  graduatedIn: yup.object().nullable(),
  university: yup.string().nullable(),
  country: yup.object().nullable().required("Country must be selected."),
  region: yup.object().nullable().required("Region must be selected."),
  district: yup.object().nullable().required("District must be selected."),
  subDistrict: yup.object().nullable().required("Upazila must be selected."),
  village: yup.object().nullable().required("Village must be selected."),
});

const AccountToRegister: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

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
      <HeaderForRegister />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Account" />

        <Formik
          initialValues={{
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
          validationSchema={accountSchema}
          onSubmit={async (values, actions) => {
            // console.log({ values, actions });

            const avatarBody = new FormData();
            avatarBody.append("file", avatar);
            console.log('avatar body', avatarBody)

            const body = {
              uuid: user.uuid,
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
                          Education info
                        </Text>

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
                          isInvalid={false}
                        />
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
                          isRequired={true}
                          isInvalid={!selectedCountry}
                          error={errors.country}
                        />

                        <InputBoxWithSelect
                          id="region"
                          label="Region"
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

      <Box mt={8}>
        <Footer />
      </Box>
    </Fragment>
  );
};

const InputBox: React.FC<{
  id: string;
  label: string;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
  isRequired: boolean;
  isInvalid: boolean;
}> = ({ id, label, onChange, isRequired, isInvalid }) => {
  return (
    <Fragment>
      <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
        <HStack mt={4}>
          <FormLabel w="40%" fontSize="13px" color="GrayText">
            {label}
          </FormLabel>
          <Box w="full">
            <Input onChange={(e) => onChange(e.target.value)} />
          </Box>
        </HStack>
      </FormControl>
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
  isRequired: boolean;
  isInvalid: boolean;
  error: any;
}> = ({
  id,
  label,
  options,
  optionLabel,
  selectedOption,
  setSelectedOption,
  isRequired,
  isInvalid,
  error,
}) => {
  return (
    <Fragment>
      <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
        <HStack mt={4}>
          <FormLabel w="40%" fontSize="13px" color="GrayText">
            {label}
          </FormLabel>
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
        <HStack spacing={5}>
          <Box w="40%"></Box>
          <Box w="full">
            <FormErrorMessage>{error}</FormErrorMessage>
          </Box>
        </HStack>
      </FormControl>
    </Fragment>
  );
};

export default AccountToRegister;
