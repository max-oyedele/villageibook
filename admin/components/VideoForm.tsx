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

import VideoUpload from 'admin/components/VideoUpload';
import InputBox from 'components/widgets/InputBox';
import InputTextArea from 'components/widgets/InputTextArea';

import useAdminFetchData from 'hooks/use-admin-fetch-data';
import useAdminActionDispatch from 'hooks/use-admin-action-dispatch';
import { Video, Village } from 'types/schema';

const VideoForm: React.FC<{
    type: string,
    village: Village,
    video?: Video,
    isEdit: boolean,
    onSubmit
}> = ({
    type,
    village,
    video,
    isEdit,
    onSubmit
}) => {
        const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
        const toast = useToast();

        const [uuid, setUuid] = useState(video?.uuid);                
        const [name, setName] = useState(video?.name);                
        const [description, setDescription] = useState(video?.description);
        const [avatar, setAvatar] = useState(null);
        const [avatarUrl, setAvatarUrl] = useState(video?.url);

        const { error } = useAdminFetchData();
        const { submitVideoData, submitVideoEditData } = useAdminActionDispatch();

        if (error) {
            onSubmit("error");
        }

        const validationSchema = yup.object({
            name: yup.string().nullable(),
            description: yup.string().nullable(),
        });

        return (
            <Formik
                initialValues={{
                    name: name,
                    description: description,                    
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    const params = {
                        video: { avatar, name, description },
                        uuid
                    };

                    actions.setSubmitting(true);
                    if (!isEdit) {
                        await submitVideoData(params);
                        onSubmit("add");
                    } else {
                        await submitVideoEditData(params);
                        onSubmit("update");
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
                                isRequired={false}
                                isInvalid={!!errors.name}
                                error={errors.name}
                            />
                            <InputTextArea
                                id="description"
                                label="Description"
                                value={description ?? ""}
                                onChange={setDescription}
                                isRequired={false}
                                isInvalid={!!errors.description}
                                error={errors.description}
                            />
                            <Box w="full" border="1px" borderColor="gray.200" borderRadius="4px" p={4}>
                                <Center>
                                    <VideoUpload setAvatar={setAvatar} avatarUrl={avatarUrl} />
                                </Center>                                
                            </Box>
                        </VStack>
                        <Center mt={10}>
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
                        </Center>
                    </Form>
                )}
            </Formik>
        )
    }

export default VideoForm;