import { useState, useEffect } from 'react';
import {
    Container,
    Stack,
    HStack,
    VStack,
    Divider,
    Flex,
    Center,
    Box,
    Text,
    Button,
    useBreakpointValue,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import AvatarUpload from 'admin/components/AvatarUpload';
import InputBox from 'components/widgets/InputBox';

import useAdminActionDispatch from 'hooks/use-admin-action-dispatch';
import { Personality } from 'types/schema';

const PersonalityForm: React.FC<{ type: string, personality?: Personality }> = ({ type, personality }) => {
    const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

    const [name, setName] = useState(personality?.name)
    const [avatar, setAvatar] = useState(null);
    const [about, setAbout] = useState(personality?.about)
    const [dateOfBirth, setDateOfBirth] = useState(personality?.dateOfBirth);
    const [dateOfDeath, setDateOfDeath] = useState(personality?.dateOfDeath);
    const [educationLife, setEducationLife] = useState(personality?.educationLife);
    const [achievements, setAchievements] = useState(personality?.achievements);
    const [career, setCareer] = useState(personality?.career);

    const { submitPersonalityData } = useAdminActionDispatch();

    const validationSchema = yup.object({
        name: yup.string().nullable().required("Name is required."),
        about: yup.string().nullable(),
        dateOfBirth: yup.string().nullable(),
        dateOfDeath: yup.string().nullable(),
        educationLife: yup.string().nullable(),
        achievements: yup.string().nullable(),
        career: yup.string().nullable(),
    });

    return (
        <Formik
            initialValues={{
                name: name,
                about: about,
                dateOfBirth: dateOfBirth,
                dateOfDeath: dateOfDeath,
                educationLife: educationLife,
                achievements: achievements,
                career: career
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                // console.log({ values, actions });
                const params = {
                    name,
                    avatar,
                    about,
                    dateOfBirth,
                    dateOfDeath,
                    educationLife,
                    achievements,
                    career
                };

                actions.setSubmitting(true);
                await submitPersonalityData(params);
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
                    <VStack spacing={4}>
                        <Box>
                            <AvatarUpload setAvatar={setAvatar} />
                        </Box>

                        <InputBox
                            id="name"
                            label="name"
                            value={name ?? ""}
                            onChange={setName}
                            isRequired={true}
                            isInvalid={!!errors.name}
                            error={errors.name}
                        />
                        <InputBox
                            id="about"
                            label="about"
                            value={about ?? ""}
                            onChange={setAbout}
                            isRequired={false}
                            isInvalid={!!errors.about}
                            error={errors.about}
                        />
                        <InputBox
                            id="dateOfBirth"
                            label="dateOfBirth"
                            value={dateOfBirth ?? ""}
                            onChange={setDateOfBirth}
                            isRequired={false}
                            isInvalid={!!errors.dateOfBirth}
                            error={errors.dateOfBirth}
                        />
                        <InputBox
                            id="dateOfDeath"
                            label="dateOfDeath"
                            value={dateOfDeath ?? ""}
                            onChange={setDateOfDeath}
                            isRequired={false}
                            isInvalid={!!errors.dateOfDeath}
                            error={errors.dateOfDeath}
                        />
                        <InputBox
                            id="educationLife"
                            label="educationLife"
                            value={educationLife ?? ""}
                            onChange={setEducationLife}
                            isRequired={false}
                            isInvalid={!!errors.educationLife}
                            error={errors.educationLife}
                        />
                        <InputBox
                            id="achievements"
                            label="achievements"
                            value={achievements ?? ""}
                            onChange={setAchievements}
                            isRequired={false}
                            isInvalid={!!errors.achievements}
                            error={errors.achievements}
                        />
                        <InputBox
                            id="career"
                            label="career"
                            value={career ?? ""}
                            onChange={setCareer}
                            isRequired={false}
                            isInvalid={!!errors.career}
                            error={errors.career}
                        />

                    </VStack>
                    <Center mt={10}>
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
                    </Center>
                </Form>
            )}
        </Formik>
    )
}

export default PersonalityForm;