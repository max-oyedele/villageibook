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

const totalGraduates = 1000;
const jammuraGraduates = 124;
const graduates:any = {
  barisal: {
    inter: 12,
    oversea: 12,
  },
  chittagong: {
    inter: 11,
    oversea: 2,
  },
  dhaka: {
    inter: 10,
    oversea: 14,
  },
  khulna: {
    inter: 21,
    oversea: 5,
  },
  mymensingh: {
    inter: 16,
    oversea: 11,
  },
  rajshahi: {
    inter: 18,
    oversea: 8,
  },
  rangpur: {
    inter: 14,
    oversea: 13,
  },
  sylhet: {
    inter: 13,
    oversea: 13,
  },
};

const GraduateStatCard: React.FC<{ villageName: string }> = ({
  villageName,
}) => {
  return (
    <Fragment>
      <Flex
        w="full"
        flexDirection="column"
        p={6}
        bgColor="white"
        borderRadius="6px"
      >
        <Text fontSize="13px" fontWeight="bold" textTransform="capitalize">
          {villageName} Graduates
        </Text>
        <Progress
          max={totalGraduates}
          value={jammuraGraduates}
          size="xs"
          colorScheme="purple"
          mt={4}
        />
        <Flex justifyContent="space-between" mt={4}>
          <HStack>
            <Text fontSize="26px" fontWeight="bold" color="purpleTone">
              {jammuraGraduates}
            </Text>
            <Text fontSize="10px" fontWeight="bold">
              /{totalGraduates}
            </Text>
          </HStack>
          <Text fontSize="10px" fontWeight="bold">
            {(jammuraGraduates / totalGraduates) * 100}%
          </Text>
        </Flex>

        <VStack divider={<StackDivider />} mt={8}>
          {Object.keys(graduates).map((region) => (
            <Flex w="full" key={region} justifyContent="space-between" alignItems="center">
              <Text fontSize="12px" fontWeight="bold" textTransform="capitalize">{region}</Text>
              <Capsule inter={graduates[region].inter} oversea={graduates[region].oversea}/>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Fragment>
  );
};

const Capsule: React.FC<{ inter: number; oversea: number }> = ({
  inter,
  oversea,
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

export default GraduateStatCard;
