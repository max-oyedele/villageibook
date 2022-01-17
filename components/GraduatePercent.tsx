import React, { Fragment } from "react";
import {
  Flex,
  HStack,
  VStack,
  StackDivider,
  Box,
  Text,
  Image,
  Progress,
} from "@chakra-ui/react";

const GraduatePercent: React.FC<{
  totalCount: number;
  domesticCount: number;
}> = ({ totalCount, domesticCount }) => {
  return (
    <Fragment>
      <Box w="full">
        <Text fontSize="14px" textTransform="capitalize">
          Our Graduates
        </Text>
        <Progress
          max={totalCount}
          value={domesticCount}
          size="xs"
          colorScheme="purple"
          mt={4}
        />
        <Flex justifyContent="space-between" mt={4}>
          <HStack>
            <Text fontSize="26px" fontWeight="bold" color="purpleTone">
              {domesticCount}
            </Text>
            <Text fontSize="11px">/{totalCount}</Text>
          </HStack>
          <Text fontSize="11px">
            {isNaN(domesticCount / totalCount)
              ? 0
              : (domesticCount / totalCount) * 100}
            %
          </Text>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default GraduatePercent;
