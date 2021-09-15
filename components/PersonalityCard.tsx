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

const PersonalityCard: React.FC<{ personality: Personality }> = ({
  personality,
}) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <HStack w="full" border="1px" borderColor="gray.300" borderRadius="5px">
          <Image src={personality.img} alt="" w="135px" h="135px" fit="cover" />
          <Box w="full" p={4}>
            <Text
              fontSize="12px"
              fontWeight="400"
              color="GrayText"
              textTransform="capitalize"
            >
              {personality.region}
            </Text>
            <Text
              fontSize="18px"
              color="primary"
              textTransform="capitalize"
            >
              {personality.name}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="GrayText" mt={2}>
              {personality.desc}
            </Text>
          </Box>
          <Box px={4}>
            <Button
              px={4}
              h="26px"
              fontSize="12px"
              fontWeight="400"
              bgColor="#FFB425"
              color="white"
            >
              Read Bio
            </Button>
          </Box>
        </HStack>
      )}

      {breakpointValue === "base" && (
        <VStack
          w="full"
          spacing={4}
          border="1px"
          borderColor="gray.300"
          borderRadius="5px"
          p={4}
        >
          <HStack w="full" pos="relative" spacing={2}>
            <Image
              src={personality.img}
              alt=""
              w="44px"
              h="44px"
              fit="cover"
              borderRadius="full"
            />
            <Box>
              <Text fontSize="10px" color="GrayText">
                {personality.region}
              </Text>
              <Text fontSize="13px" fontWeight="600" color="primary">
                {personality.name}
              </Text>
            </Box>
          </HStack>
          <Text fontSize="11px" color="GrayText">
            {personality.desc}
          </Text>

          <Button
            w={{ base: "full", sm: "auto" }}
            h={8}
            fontSize="12px"
            fontWeight="400"
            bgColor="#FFB425"
            color="white"
          >
            Read Bio
          </Button>
        </VStack>
      )}
    </Fragment>
  );
};

export default PersonalityCard;
