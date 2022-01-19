import { Fragment } from "react";
import Link from "next/link";
import { Flex, Box, Text, Image, Button } from "@chakra-ui/react";

import ReadMoreLess from "components/widgets/ReadMoreLess";
import type { Story } from "types/schema";

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <Fragment>
      <Flex
        w="full"
        flexDirection="column"
        justifyContent="flex-start"
        borderRadius="8px"
        boxShadow="sm"
      >
        <Image src={story?.photo?.url??"/images/default-photo.jpg"} w="full" fit="cover" alt="" />
        <Box p={4}>
          <Text fontSize="16px" mt={4}>
            {story.title}
          </Text>
          <Text fontSize="12px" color="GrayText" mt={4}>
            <ReadMoreLess>
              {story.content}
            </ReadMoreLess>
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default StoryCard;
