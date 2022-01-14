import React, { Fragment, useState, useRef } from "react";

import {
  Flex,
  Stack,
  HStack,
  VStack,
  Box,
  Center,
  Divider,
  Text,
  Textarea,
  Image,
  Button,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";

import VideoBox from "components/widgets/VideoBox";

import { Status } from "rdx/types";

import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const PostForm: React.FC = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const toast = useToast();

  const { postStatus, postError } = useFetchData();
  const { submitPostData, resetPost } = useActionDispatch();

  const [content, setContent] = useState("");
  const [picture, setPicture] = useState(null);
  const [video, setVideo] = useState(null);

  const [pictureURL, setPictureURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const pictureRef = useRef(null);
  const videoRef = useRef(null);

  const uploadToClient = (event, type) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      if (type === "picture") {
        setPicture(i);
        setPictureURL(URL.createObjectURL(i));
      } else if (type === "video") {
        setVideo(i);
        setVideoURL(URL.createObjectURL(i));
      }
    }
  };

  const handlePost = async () => {
    const params = {
      content,
      picture,
      video,
    };

    await submitPostData(params);
  };

  if (postStatus === Status.SUCCESS) {
    setTimeout(() => {
      resetPost();
      setContent("");
      setPicture(null);
      setPictureURL(null);
      setVideo(null);
      setVideoURL(null);
    }, 1000);
  }
  if (postError) {
    !toast.isActive("postError") &&
      toast({
        id: "postError",
        title: "Post Failed. Please try again.",
        description: postError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  }

  return (
    <Fragment>
      <Textarea
        fontSize="13px"
        placeholder="Write something here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <VStack spacing={4}>
        {pictureURL && (
          <Center w="full" mt={4}>
            <Image
              src={pictureURL}
              alt=""
              borderRadius="4px"
              w="full"
              h="full"
              fit="cover"
            />
          </Center>
        )}
        {videoURL && (
          <Center w="full" mt={4}>
            <VideoBox videoUrl={videoURL} />
          </Center>
        )}
      </VStack>

      <Flex justifyContent="space-between" mt={2}>
        <HStack spacing={4} fontSize="13px" color="GrayText">
          <input
            ref={pictureRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => uploadToClient(e, "picture")}
          />
          <Flex
            alignItems="end"
            cursor="pointer"
            onClick={() => pictureRef.current?.click()}
          >
            <Image src="/icons/post-photo.svg" alt="" />
            <Text letterSpacing="0" lineHeight="1" ml={1}>
              Picture
            </Text>
          </Flex>          
          <input
            ref={videoRef}
            type="file"
            hidden
            accept="video/*"
            onChange={(e) => uploadToClient(e, "video")}
          />
          <Flex            
            alignItems="end"
            cursor="pointer"
            onClick={() => videoRef.current?.click()}
          >
            <Image src="/icons/post-video.svg" alt="" />
            <Text letterSpacing="0" lineHeight="1" ml={1}>
              Video
            </Text>
          </Flex>
        </HStack>
        <Button
          w="132px"
          h="28px"
          fontSize="13px"
          fontWeight="400"
          isLoading={postStatus === Status.LOADING}
          disabled={postStatus === Status.LOADING || !content}
          onClick={handlePost}
        >
          Post
        </Button>
      </Flex>
    </Fragment>
  );
};

export default PostForm;
