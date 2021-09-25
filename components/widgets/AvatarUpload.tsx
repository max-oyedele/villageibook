import { Fragment, useState, useRef } from "react";
import { Flex, Text, Divider, Image, Button } from "@chakra-ui/react";

const AvatarUpload = ({ setAvatar }) => {
  const avatarRef = useRef(null);

  const [avatarURL, setAvatarURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setAvatar(i);
      setAvatarURL(URL.createObjectURL(i));
    }
  };

  return (
    <Fragment>
      <Flex flexDirection="column" bgColor="white" p={6}>
        <Text fontSize="12px" fontWeight="600">
          AVATAR
        </Text>
        <Divider my={6} />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {!avatarURL && (
            <Image
              src="/icons/upload-avatar.svg"
              w="80px"
              h="80px"
              alt=""
              mt={8}
            />
          )}
          {avatarURL && (
            <Image
              src={avatarURL}
              w="80px"
              h="80px"
              borderRadius="full"
              fit="cover"
              alt=""
              mt={8}
            />
          )}
          <input
            ref={avatarRef}
            type="file"
            hidden
            accept="image/*"
            onChange={uploadToClient}
          />
          <Button
            h="25px"
            color="purpleTone"
            fontSize="12px"
            fontWeight="400"
            border="1px"
            borderColor="gray.300"
            borderRadius="full"
            _focus={{ boxShadow: "none" }}
            mt={8}
            onClick={() => avatarRef.current?.click()}
          >
            UPLOAD AVATAR
          </Button>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default AvatarUpload;