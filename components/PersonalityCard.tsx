import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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

import type { Personality } from "types/schema";

const PersonalityCard: React.FC<{ personality: Personality }> = ({
  personality,
}) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <HStack w="full" minH="170px" border="1px" borderColor="gray.300" borderRadius="5px">
          <Box pos="relative" minW="max-content" p={4}>
            <Image
              src={personality?.photo?.url ?? "/images/default-user.png"}
              alt=""
              boxSize="135px"
              fit="cover"
            />
          </Box>
          <Box w="full" p={4}>
            <Text
              fontSize="12px"
              fontWeight="400"
              color="GrayText"
              textTransform="capitalize"
            >
              {/* {person.comesFrom?.name} */}
            </Text>
            <Text fontSize="18px" color="primary" textTransform="capitalize">
              {personality?.name}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="GrayText" mt={2}>
              {personality?.about}
            </Text>
          </Box>
          <Box px={4}>
            <Link href={`/personview/${personality?.uuid}`} passHref={true}>
              <Button
                px={4}
                h="26px"
                fontSize="12px"
                fontWeight="400"
                bgColor="#FFB425"
                color="white"
                _focus={{ boxShadow: "none" }}
              >
                View More
              </Button>
            </Link>
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
              src={personality?.photo?.url ?? "/images/default-user.png"}
              alt=""
              boxSize="44px"
              fit="cover"
              borderRadius="full"
            />
            <Box>
              <Text fontSize="10px" color="GrayText">
                {/* {user.comesFrom?.name} */}
              </Text>
              <Text fontSize="13px" fontWeight="600" color="primary">
                {personality?.name}
              </Text>
            </Box>
          </HStack>
          <Text fontSize="11px" color="GrayText">
            {personality.about}
          </Text>

          <Link href={`/personview/${personality?.uuid}`} passHref={true}>
            <Button
              w={{ base: "full", sm: "auto" }}
              h={8}
              fontSize="12px"
              fontWeight="400"
              bgColor="#FFB425"
              color="white"
            >
              View More
            </Button>
          </Link>
        </VStack>
      )}
    </Fragment>
  );
};

export default PersonalityCard;
