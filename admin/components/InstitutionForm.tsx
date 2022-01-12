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
    useToast
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import AvatarUpload from 'admin/components/AvatarUpload';
import InputBox from 'components/widgets/InputBox';

import useAdminFetchData from 'hooks/use-admin-fetch-data';
import useAdminActionDispatch from 'hooks/use-admin-action-dispatch';
import { Institution, Village } from 'types/schema';

const InstitutionForm: React.FC<{
    type: string,
    village: Village,
    institution?: Institution,
    isEdit: boolean
}> = ({
    type,
    village,
    institution,
    isEdit
}) => {
        const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
        const toast = useToast();

        const [name, setName] = useState(institution?.name);
        const [avatar, setAvatar] = useState(null);
        const [photo, setPhoto] = useState(institution?.photo);
        const [yearEstablished, setYearEstablished] = useState(institution?.yearEstablished);
        const [address, setAddress] = useState(institution?.address);
        const [email, setEmail] = useState(institution?.email);
        const [phone, setPhone] = useState(institution?.phone);
        const [history, setHistory] = useState(institution?.history);

        const { error } = useAdminFetchData();
        const { submitInstitutionData, submitInstitutionEditData } = useAdminActionDispatch();
        
        if (error) {
            !toast.isActive("institutionError") &&
                toast({
                    id: "institutionError",
                    title: "Failed! Try again.",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
        }

        const validationSchema = yup.object({
            name: yup.string().required("Name is required."),
            photoName: yup.string().nullable(),
            photoDescription: yup.string().nullable(),
            yearEstablished: yup.string().nullable(),
            address: yup.string().nullable(),
            email: yup.string().email("Provide correct Email address.").nullable(),
            phone: yup.string().nullable(),
            history: yup.string().nullable(),
        });


        return (
            <Formik
                initialValues={{
                    name: name,
                    photoName: photo?.name,
                    photoDescription: photo?.description,
                    yearEstablished: yearEstablished,
                    address: address,
                    email: email,
                    phone: phone,
                    history: history
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    const params = {
                        villageUuid: village.uuid,
                        name,
                        photo: { avatar, name: photo.name, description: photo.description },
                        yearEstablished,
                        address,
                        email,
                        phone,
                        history
                    };

                    actions.setSubmitting(true);
                    if (!isEdit) {
                        await submitInstitutionData(params);
                    } else {
                        await submitInstitutionEditData(params);
                    }
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
                            <InputBox
                                id="name"
                                label="Name"
                                value={name ?? ""}
                                onChange={(e) => setName(e.target.value)}
                                isRequired={true}
                                isInvalid={!!errors.name}
                                error={errors.name}
                            />
                            <Box w="full" border="1px" borderColor="gray.200" borderRadius="4px" p={4}>
                                <Center>
                                    <AvatarUpload avatarUrl={photo?.url} setAvatar={setAvatar} />
                                </Center>
                                <InputBox
                                    id="photoName"
                                    label="Photo Name"
                                    value={photo?.name ?? ""}
                                    onChange={(e) => setPhoto({ ...photo, name: e.target.value })}
                                    isRequired={false}
                                    isInvalid={!!errors.photoName}
                                    error={errors.photoName}
                                />
                                <InputBox
                                    id="photoDescription"
                                    label="Photo Description"
                                    value={photo?.description ?? ""}
                                    onChange={(e) => setPhoto({ ...photo, description: e.target.value })}
                                    isRequired={false}
                                    isInvalid={!!errors.photoDescription}
                                    error={errors.photoDescription}
                                />
                            </Box>
                            <InputBox
                                id="yearEstablished"
                                label="Year of Established"
                                value={yearEstablished ?? ""}
                                onChange={(e) => setYearEstablished(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.yearEstablished}
                                error={errors.yearEstablished}
                            />
                            <InputBox
                                id="address"
                                label="Address"
                                value={address ?? ""}
                                onChange={(e) => setAddress(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.address}
                                error={errors.address}
                            />
                            <InputBox
                                id="email"
                                label="Email"
                                value={email ?? ""}
                                onChange={(e) => setEmail(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.email}
                                error={errors.email}
                            />
                            <InputBox
                                id="phone"
                                label="Phone number"
                                value={phone ?? ""}
                                onChange={(e) => setPhone(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.phone}
                                error={errors.phone}
                            />
                            <InputBox
                                id="history"
                                label="History"
                                value={history ?? ""}
                                onChange={(e) => setHistory(e.target.value)}
                                isRequired={false}
                                isInvalid={!!errors.history}
                                error={errors.history}
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

export default InstitutionForm;