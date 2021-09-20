import { useRouter } from "next/router";
import Link from "next/link";
import {
  HStack,
  VStack,
  Divider,
  Box,
  Image,
  Text,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";

import { myVillageItems } from "constants/myVillageItems";
import { myVillageStats } from "data/myvillage";

const MyVillageItems: React.FC = () => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <VStack
      spacing={1}
      divider={breakpointValue === "base" ? <Divider /> : null}
    >
      {myVillageItems.map((item) => (
        <Link key={item.name} href={item.path}>
          <HStack
            w="full"
            h={{ base: "60px", md: "40px" }}
            spacing={4}
            bgColor={
              item.path === pathname ? item.activeBgColor : "transparent"
            }
            borderRadius="8px"
            px={2}
            cursor="pointer"
            _hover={{
              bgColor: "gray.100",
            }}
          >
            <Image
              src={item.img}
              alt=""
              w={{ base: "50px", md: "30px" }}
              h={{ base: "50px", md: "30px" }}
            />
            <Text w="full" fontSize="13px">
              {item.name}
            </Text>

            <Badge
              bgColor={item.path === pathname ? item.badgeColor : "#FBFBFA"}
              color={item.path === pathname ? "white" : ""}
              fontSize="11px"
              fontWeight="400"
              lineHeight={2}
              px={2}
              borderRadius="xl"
            >
              {myVillageStats[item.value]}
            </Badge>

          </HStack>
        </Link>
      ))}
    </VStack>
  );
};

export default MyVillageItems;
