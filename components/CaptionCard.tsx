import React, { Fragment } from "react";
import { Flex, HStack, Box, Text, Image } from "@chakra-ui/react";

const CaptionCard: React.FC<{ caption: string; desc: string }> = ({
  caption,
  desc,
}) => {
  return (
    <Fragment>
      <Flex
        w="full"
        flexDirection="column"
        justifyContent="center"
        p={6}
        bgColor="#EEECFF"
        color="purpleTone"
        borderRadius="6px"
      >
        <Text fontSize="13px" fontWeight="bold">
          {caption}
        </Text>
        <Text fontSize="25px" fontWeight="bold">
          {desc}
        </Text>
      </Flex>
    </Fragment>
  );
};

export default CaptionCard;
