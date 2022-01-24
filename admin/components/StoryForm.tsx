import { useState } from 'react';
import {
    VStack,
    Center,
    Box,
    Button,
    useBreakpointValue,
    useToast
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import AvatarUpload from 'admin/components/AvatarUpload';
import InputBox from 'components/widgets/InputBox';
import InputTextArea from 'components/widgets/InputTextArea';

import useAdminFetchData from 'hooks/use-admin-fetch-data';
import useAdminActionDispatch from 'hooks/use-admin-action-dispatch';
import { Story, Village } from 'types/schema';

const StoryForm: React.FC<{
    type: string,
    village: Village,
    story?: Story,
    isEdit: boolean,
    onSubmit
}> = ({
    type,
    village,
    story,
    isEdit,
    onSubmit
}) => {
        const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
        const toast = useToast();

        const [uuid, setUuid] = useState(story?.uuid);        
        const [title, setTitle] = useState(story?.title);        
        const [content, setContent] = useState(story?.content);
        const [avatar, setAvatar] = useState(null);
        const [photo, setPhoto] = useState(story?.photo);

        const { error } = useAdminFetchData();
        const { submitStoryData } = useAdminActionDispatch();

        if (error) {
            onSubmit(error);
        }

        const validationSchema = yup.object({
            title: yup.string().required("Title is required."),
            content: yup.string().required("Content is required."),
            photoName: yup.string().nullable(),
            photoDescription: yup.string().nullable(),            
        });

        return (
            <Formik
                initialValues={{
                    title: title,
                    content: content,
                    photoName: photo?.name,
                    photoDescription: photo?.description,
                    uuid: isEdit ? uuid : null
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    const params = {
                        villageUuid: village.uuid,
                        uuid,
                        title,
                        content,
                        photo: { avatar, name: photo.name, description: photo.description },                        
                    };

                    actions.setSubmitting(true);
                    await submitStoryData(params);
                    if (!isEdit) onSubmit("add");
                    else onSubmit("update");
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
                                id="title"
                                label="Title"
                                value={title ?? ""}
                                onChange={(e) => setTitle(e.target.value)}
                                isRequired={true}
                                isInvalid={!!errors.title}
                                error={errors.title}
                            />
                            <InputTextArea
                                id="content"
                                label="Content"
                                value={content ?? ""}
                                onChange={setContent}
                                isRequired={true}
                                isInvalid={!!errors.content}
                                error={errors.content}
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
                                    id="hasPhotoDescription"
                                    label="Photo Description"
                                    value={photo?.description ?? ""}
                                    onChange={(e) => setPhoto({ ...photo, description: e.target.value })}
                                    isRequired={false}
                                    isInvalid={!!errors.photoDescription}
                                    error={errors.photoDescription}
                                />
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

export default StoryForm;