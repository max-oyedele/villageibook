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

import type { User } from "types/data";

const PersonalityCard: React.FC<{ user: User }> = ({
  user,
}) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <HStack w="full" border="1px" borderColor="gray.300" borderRadius="5px">
          <Box pos="relative" minW="max-content">
            <Image
              src={user.img}
              alt=""
              w="135px"
              h="135px"
              fit="cover"
            />
            {user.role === "premium" && (
              <Box pos="absolute" top={2} left={2}>
                <Badge
                  fontSize="9px"
                  fontWeight="400"
                  opacity={0.8}
                  borderRadius="full"
                  px={2}
                >
                  PREMIUM
                </Badge>
              </Box>
            )}
          </Box>
          <Box w="full" p={4}>
            <Text
              fontSize="12px"
              fontWeight="400"
              color="GrayText"
              textTransform="capitalize"
            >
              {user.location}
            </Text>
            <Text fontSize="18px" color="primary" textTransform="capitalize">
              {user.name}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="GrayText" mt={2}>
              {user.desc}
            </Text>
          </Box>
          <Box px={4}>
            <Link href={`/userview/${user.id}`}>
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
              src={user.img}
              alt=""
              w="44px"
              h="44px"
              fit="cover"
              borderRadius="full"
            />
            {user.role === "premium" && (
              <Flex
                w="full"
                pos="absolute"
                top={0}
                right={0}
                justifyContent="flex-end"
              >
                <Badge
                  fontSize="8px"
                  fontWeight="400"
                  borderRadius="full"
                  px={2}
                >
                  PREMIUM
                </Badge>
              </Flex>
            )}
            <Box>
              <Text fontSize="10px" color="GrayText">
                {user.location}
              </Text>
              <Text fontSize="13px" fontWeight="600" color="primary">
                {user.name}
              </Text>
            </Box>
          </HStack>
          <Text fontSize="11px" color="GrayText">
            {user.desc}
          </Text>

          <Link href={`/userview/${user.id}`}>
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
