import { Fragment, useState, useRef, useEffect } from "react";
import { Flex, Text, Divider, Image, Button } from "@chakra-ui/react";

const AvatarUpload: React.FC<{ avatarUrl?, setAvatar }> = ({ avatarUrl, setAvatar }) => {

  const avatarRef = useRef(null);
  const [avatarURL, setAvatarURL] = useState(null);
  useEffect(() => { setAvatarURL(avatarUrl) }, [avatarUrl])

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setAvatar(i);
      setAvatarURL(URL.createObjectURL(i));
    }
  };

  return (
    <Fragment>
      <Image
        src={avatarURL ?? "/icons/upload-avatar.svg"}
        boxSize="80px"
        borderRadius="full"
        fit="cover"
        alt=""        
        cursor="pointer"
        onClick={() => avatarRef.current?.click()}
      />
      <input
        ref={avatarRef}
        type="file"
        hidden
        accept="image/*"
        onChange={uploadToClient}
      />
    </Fragment>
  );
};

export default AvatarUpload;
