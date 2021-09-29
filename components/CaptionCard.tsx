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
        <Text fontSize="24px" textAlign="center">Welcome to</Text>
        <Text fontSize="24px" fontWeight="700" textAlign="center" textTransform="capitalize" mt={2}>
          {name}
        </Text>
      </Flex>
    </Fragment>
  );
};

export default CaptionCard;
