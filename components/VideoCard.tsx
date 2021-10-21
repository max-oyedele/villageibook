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

import VideoBox from "components/VideoBox";

const VideoCard: React.FC<{ video: string }> = ({ video }) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Flex w="full" flexDirection="column">
        <VideoBox videoUrl={video} />
        <Box mt={4}>
          <Text fontSize="15px" color="primary" textTransform="capitalize">
            {"video.title"}
          </Text>
          <Text fontSize="12px" color="GrayText" textTransform="capitalize">
            {"video.author"}
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default VideoCard;
