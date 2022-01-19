import { Fragment } from "react";
import {
  HStack,
  VStack,
  AspectRatio,
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
import ReadMoreLess from "components/widgets/ReadMoreLess";
import { Video } from "types/data";

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <Fragment>
      <Flex w="full" flexDirection="column">
        <AspectRatio border="1px" borderColor="gray.100" borderRadius="6px">
          <VideoBox videoUrl={video.url} />
        </AspectRatio>
        <Box mt={4}>
          <Text fontSize="15px" color="primary" textTransform="capitalize">
            {video.name}
          </Text>
          <Box
            color="GrayText"
            fontSize="12px"
            textTransform="capitalize"
            mt={2}
          >
            <ReadMoreLess>{video.description}</ReadMoreLess>
          </Box>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default VideoCard;
