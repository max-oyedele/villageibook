import React, { Fragment } from "react";
import { Flex, HStack, Box, Text, Image } from "@chakra-ui/react";

const VillageCard: React.FC<{ name: string; img: string; last: number }> = ({
  name,
  img,
  last,
}) => {
  return (
    <Fragment>
      <Flex
        w="full"
        justifyContent="center"
        alignItems="center"
        p={4}
        bgColor="white"
        borderRadius="6px"
      >
        <Image src={img} alt="" borderRadius="4px" />
        <Box w="full" ml={4}>
          <Text fontSize="13px" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="12px" color="grayText">
            {last === 0
              ? "Today"
              : last === 1
              ? "Yesterday"
              : `${last} days ago`}
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default VillageCard;
