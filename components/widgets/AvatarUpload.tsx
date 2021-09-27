import { Fragment, useState, useRef } from "react";
import { Flex, Text, Divider, Image, Button } from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";

import { submit } from "rdx/slices/auth";
import { MyThunkDispatch, OurStore } from "rdx/store";


const AvatarUpload = () => {
  const dispatch: MyThunkDispatch = useDispatch();
  const { jwt, user } = useSelector((state: OurStore) => state.authReducer);

  const avatarRef = useRef(null);

  const [avatar, setAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);

  const [isUploading, setIsUploading] = useState(false);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setAvatar(i);
      setAvatarURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async () => {
    const avatarBody = new FormData();
    avatarBody.append("file", avatar);

    const body = {
      type: "avatar",
      uuid: user.uuid,
      avatar: avatarBody
    }

    setIsUploading(true);
    await dispatch(submit(body));
    setIsUploading(false);
  }

  return (
    <Fragment>
      <Flex
        flexDirection="column"
        bgColor="white"
        border="1px"
        borderRadius="8px"
        borderColor="gray.200"
        p={6}
      >
        <Text fontSize="12px" fontWeight="600">
          AVATAR
        </Text>
        <Divider my={6} />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={avatarURL ?? "/icons/upload-avatar.svg"}
            w="80px"
            h="80px"
            borderRadius="full"
            fit="cover"
            alt=""
            mt={8}
            cursor="pointer"
            onClick={()=>avatarRef.current?.click()}
          />
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
            onClick={() => uploadToServer()}
            isLoading={isUploading}
            disabled={!avatarURL}
          >
            UPLOAD AVATAR
          </Button>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default AvatarUpload;
