import { Fragment } from "react";
import Link from "next/link";
import { Flex, Box, Text, Image, Button } from "@chakra-ui/react";

import type { Story } from "types/schema";

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <Fragment>
      <Flex
        w="full"
        flexDirection="column"
        justifyContent="center"
        borderRadius="8px"
        boxShadow="sm"
      >
        <Image src={story?.photo?.url??"/images/default-photo.jpg"} w="full" fit="cover" alt="" />
        <Box p={4}>
          <Text fontSize="16px" mt={4}>
            {story.title}
          </Text>
          <Text fontSize="12px" color="GrayText" mt={4}>
            {story.content}
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default StoryCard;
