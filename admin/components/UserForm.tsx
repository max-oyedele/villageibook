import { useState, useEffect, useRef } from 'react';
import {
    Container,
    Stack,
    HStack,
    VStack,
    Divider,
    Flex,
    Textarea,
    Box,
    Text,
    SimpleGrid,
    AspectRatio,
    Button,
    Image,
    useToast
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import AvatarUpload from 'admin/components/AvatarUpload';
import InputBox from 'components/widgets/InputBox';

import useAdminFetchData from 'hooks/use-admin-fetch-data';
import useAdminActionDispatch from 'hooks/use-admin-action-dispatch';
import InputTextArea from "components/widgets/InputTextArea";
import { User } from 'types/schema';
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const UserForm: React.FC<{
    type: string,
    user: User,
    isEdit: boolean
}> = ({
    type,
    user,
    isEdit
}) => {
    const { me } = useFetchData();
    const { submitStepTwoData } = useActionDispatch();

    const [about, setAbout] = useState(user.about);
    const [avatar, setAvatar] = useState(user.avatar);
    const [id, setId] = useState(user.uuid);
  
    const photoRefs = useRef([]);
    const [photo1, setPhoto1] = useState(user.photo1);
    const [photo2, setPhoto2] = useState(user.photo2);
    const [photo3, setPhoto3] = useState(user.photo3);
    const [photoURL1, setPhotoURL1] = useState(user.photo1 ?? null);
    const [photoURL2, setPhotoURL2] = useState(user.photo2 ?? null);
    const [photoURL3, setPhotoURL3] = useState(user.photo3 ?? null);
  
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
      about: yup.string().nullable().required("About me is required."),
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
            {/* <InputTextArea
              id="about"
              label="About Me"
              rows={10}
              onChange={setAbout}
              isRequired={true}
              isInvalid={!!errors.about}
              error={errors.about}
            /> */}
            <Textarea
                fontSize="13px"
                placeholder="Write something here..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
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
            </HStack>
          </Form>
        )}
      </Formik>
    );
  };
  
    

export default UserForm;