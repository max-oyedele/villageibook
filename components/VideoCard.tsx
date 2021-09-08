import { Fragment } from "react";
import Link from "next/link";
import { Flex, Box, Text, Image, Button } from "@chakra-ui/react";

const VideoCard = () => {
  return (
    <Fragment>
      <Flex w="full" pos="relative" justifyContent="center" alignItems="center">
        <Image
          src="/images/video-card.png"
          w="full"
          fit="cover"
          alt="signup"
        />
        <Box pos="absolute" cursor="pointer">
          <Image src="/images/video-play.png" alt="" />
        </Box>
      </Flex>
    </Fragment>
  );
};

export default VideoCard;
