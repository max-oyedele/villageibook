import React, { Fragment, useState, useRef } from "react";

import {
  Flex,
  Stack,
  HStack,
  Box,
  Center,
  Divider,
  Text,
  Textarea,
  Image,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import VideoBox from "components/VideoBox";

import { Status } from "rdx/types";

import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const PostForm: React.FC = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { meStatus } = useFetchData();
  const { submitPostData } = useActionDispatch();

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
    console.log("content", content);
    console.log("picture", picture);
    console.log("video", video);

    const params = {
      content,
      picture,
      video,
    };

    await submitPostData(params);
  };

  return (
    <Fragment>
      <Textarea
        fontSize="13px"
        placeholder="Write something here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Stack direction={{ base: "column", lg: "row" }} spacing={4} mt={4}>
        {pictureURL && (
          <Center w="full">
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
          <Center w="full">
            <VideoBox
              videoUrl={videoURL}
            />
          </Center>
        )}
      </Stack>

      <Divider mt={4} mb={2} />
      <Flex justifyContent="space-between">
        <HStack spacing={4} fontSize="13px" color="GrayText">
          <input
            ref={pictureRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => uploadToClient(e, "picture")}
          />
          <HStack
            spacing={1}
            cursor="pointer"
            onClick={() => pictureRef.current?.click()}
          >
            <Image src="/icons/post-photo.svg" />
            <Text>Picture</Text>
          </HStack>
          <input
            ref={videoRef}
            type="file"
            hidden
            accept="video/*"
            onChange={(e) => uploadToClient(e, "video")}
          />
          <HStack
            spacing={1}
            cursor="pointer"
            onClick={() => videoRef.current?.click()}
          >
            <Image src="/icons/post-video.svg" />
            <Text>Video</Text>
          </HStack>
        </HStack>
        <Button
          h="27px"
          fontSize="13px"
          fontWeight="400"
          bgColor="greenTone"
          color="white"
          _focus={{ boxShadow: "none" }}
          isLoading={meStatus === Status.LOADING}
          disabled={meStatus === Status.LOADING}
          onClick={handlePost}
        >
          Post
        </Button>
      </Flex>
    </Fragment>
  );
};

export default PostForm;
