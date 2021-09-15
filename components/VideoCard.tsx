import { Fragment } from "react";
import { useRouter } from "next/router";
import {
  HStack,
  VStack,
  Divider,
  Flex,
  Box,
  Image,
  Text,
  Badge,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import type { Video } from "data/myPages";

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Flex w="full" flexDirection="column">
        <Flex pos="relative" justifyContent="center" alignItems="center">
          <Image src={video.img} alt="" w="100%" h="181px" fit="cover" borderRadius="4px" />
          <Box pos="absolute">
            <Image src="/images/video-play.png" alt=""/>
          </Box>
        </Flex>
        <Box mt={4}>
          <Text fontSize="15px" color="primary" textTransform="capitalize">{video.title}</Text>
          <Text fontSize="12px" color="GrayText" textTransform="capitalize">{video.author}</Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default VideoCard;
