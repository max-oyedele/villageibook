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

const Capsule: React.FC<{ inter: number; oversea: number, color?: string }> = ({
  inter,
  oversea,
  color
}) => {
  return (
    <Fragment>
      <Flex>
        <HStack w="50px" borderLeftRadius="25px" border="1px" borderColor="gray.300" px={2}>
          <Image src="/icons/graduate-inter.svg" alt="" />
          <Text fontSize="10px" fontWeight="bold">
            {inter}
          </Text>
        </HStack>
        <HStack w="50px" borderRightRadius="25px" border="1px" borderColor="gray.300" px={2}>
          <Image src="/icons/graduate-oversea.svg" alt="" />
          <Text fontSize="10px" fontWeight="bold">
            {oversea}
          </Text>
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default Capsule;