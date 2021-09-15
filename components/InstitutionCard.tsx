import { Fragment } from "react";
import { useRouter } from "next/router";
import {
  HStack,
  VStack,
  Divider,
  Flex,
  Box,
  Image,
  Text,
  Badge,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import type { Institution } from "data/myPages";

const InstitutionCard: React.FC<{ institution: Institution }> = ({ institution }) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <HStack w="full" border="1px" borderColor="gray.300" borderRadius="5px">
        <Image src={institution.img} w="135px" h="135px" fit="cover" alt="" />
        <Box w="full" p={4}>
          <Text
            fontSize="12px"
            fontWeight="400"
            color="grayText"
            textTransform="capitalize"
          >
            {institution.category}
          </Text>
          <Text
            fontSize="18px"
            fontWeight="500"
            color="primary"
            textTransform="capitalize"
          >
            {institution.name}
          </Text>
          <Text fontSize="12px" fontWeight="400" color="grayText" mt={4}>
            {institution.address}
          </Text>
          <Text fontSize="12px" fontWeight="400" color="primary" mt={2}>
            {institution.phone}
          </Text>
        </Box>
        <Box w="200px">
          <Button
            w="120px"
            h="26px"
            fontSize="12px"
            fontWeight="400"
            bgColor="purpleTone"
            color="white"
          >
            More
          </Button>
        </Box>
      </HStack>
    </Fragment>
  );
};

export default InstitutionCard;
