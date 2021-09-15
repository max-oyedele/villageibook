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

import type { MyPage } from "data/myPages";

const MyPageCard: React.FC<{ myPage: MyPage }> = ({ myPage }) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <HStack w="full" border="1px" borderColor="gray.300" borderRadius="5px">
          <Box pos="relative" minW="max-content">
            <Image src={myPage.img} alt="" w="135px" h="135px" fit="cover" />
            {myPage.role === "premium" && (
              <Box pos="absolute" top={2} left={2}>
                <Badge fontSize="9px" fontWeight="400" opacity={0.8} borderRadius="full" px={2}>
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
              {myPage.region}
            </Text>
            <Text
              fontSize="18px"
              color="primary"
              textTransform="capitalize"
            >
              {myPage.name}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="GrayText" mt={2}>
              {myPage.desc}
            </Text>
          </Box>
          <Box px={4}>
            <Button
              px={4}
              h="26px"
              fontSize="12px"
              fontWeight="400"
              bgColor="purpleTone"
              color="white"
            >
              View Profile
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
              src={myPage.img}
              alt=""
              w="44px"
              h="44px"
              fit="cover"
              borderRadius="full"
            />
            <Box>
              <Text fontSize="10px" fontWeight="400" color="GrayText">
                {myPage.region}
              </Text>
              <Text fontSize="13px" fontWeight="600" color="primary">
                {myPage.name}
              </Text>
            </Box>
            {myPage.role === "premium" && (
              <Flex
                w="full"
                pos="absolute"
                top={0}
                right={0}
                justifyContent="flex-end"
              >
                <Badge fontSize="8px" fontWeight="400" borderRadius="full" px={2}>
                  PREMIUM
                </Badge>
              </Flex>
            )}
          </HStack>
          <Text fontSize="11px" fontWeight="400" color="GrayText">
            {myPage.desc}
          </Text>

          <Button
            w={{ base: "auto", sm: "full" }}
            h={8}
            fontSize="12px"
            fontWeight="400"
            bgColor="purpleTone"
            color="white"
          >
            View Profile
          </Button>
        </VStack>
      )}
    </Fragment>
  );
};

export default MyPageCard;
