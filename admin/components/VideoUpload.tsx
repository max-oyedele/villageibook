import { Fragment, useState, useRef, useEffect } from "react";
import { Flex, Text, Divider, Image, Button, VStack, Center } from "@chakra-ui/react";
import VideoBox from "components/widgets/VideoBox";

const VideoUpload: React.FC<{ avatarUrl?, setAvatar }> = ({ avatarUrl, setAvatar }) => {

  const avartaRef = useRef(null);
  const [avartaURL, setAvatarURL] = useState(null);
  useEffect(() => { setAvatarURL(avatarUrl) }, [avatarUrl])

  const uploadToClient = (event, type) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setAvatar(i);
      setAvatarURL(URL.createObjectURL(i));
    }
  };

  return (
    <Fragment>
      <Image
        src={avartaURL ?? "/icons/post-video.svg"}
        boxSize={avartaURL ? "0px" : "80px"}
        borderRadius="5px"
        fit="cover"
        alt=""        
        cursor="pointer"
        onClick={() => avartaRef.current?.click()}
      />
      <VStack spacing={4}>
        <Center w="full" mt={4}>
          <VideoBox
            videoUrl={avartaURL}
          />
        </Center>
      </VStack>
      <input
        ref={avartaRef}
        type="file"
        hidden
        accept="video/*"
        onChange={(e) => uploadToClient(e, "video")}
      />
    </Fragment>
  );
};

export default VideoUpload;
