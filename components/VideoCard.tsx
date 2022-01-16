import { Fragment } from "react";
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

import VideoBox from "components/widgets/VideoBox";
import { Video } from "types/data";

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <Fragment>
      <Flex w="full" flexDirection="column">
        <VideoBox videoUrl={video.url} />
        <Box mt={4}>
          <Text fontSize="15px" color="primary" textTransform="capitalize">
            {video.name}
          </Text>
          <Text fontSize="12px" color="GrayText" textTransform="capitalize">
            {video.description}
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default VideoCard;
