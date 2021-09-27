import React, { Fragment } from "react";
import { Flex, HStack, Box, Text, Image } from "@chakra-ui/react";

const CaptionCard = ({name}) => {
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
        <Text fontSize="24px">Welcome</Text>
        <Text fontSize="24px" fontWeight="700" mt={2}>
          to {name}
        </Text>
      </Flex>
    </Fragment>
  );
};

export default CaptionCard;
