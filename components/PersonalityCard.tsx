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

import type { Personality } from "data/myPages";

const PersonalityCard: React.FC<{ personality: Personality }> = ({ personality }) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <HStack w="full" border="1px" borderColor="gray.300" borderRadius="5px">
        <Image src={personality.img} alt="" w="135px" h="135px" fit="cover" />
        <Box w="full" p={4}>
          <Text
            fontSize="12px"
            fontWeight="400"
            color="grayText"
            textTransform="capitalize"
          >
            {personality.region}
          </Text>
          <Text
            fontSize="18px"
            fontWeight="500"
            color="primary"
            textTransform="capitalize"
          >
            {personality.name}
          </Text>
          <Text fontSize="12px" fontWeight="400" color="grayText" mt={2}>
            {personality.desc}
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
            Read Bio
          </Button>
        </Box>
      </HStack>
    </Fragment>
  );
};

export default PersonalityCard;
