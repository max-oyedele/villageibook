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
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";

import { villageItems } from "constants/villageItems";
import UseVillageStats from "hooks/use-village-stats";

import { villageName } from "data/browse";

const LeftVillageItems: React.FC = () => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { villageStats } = UseVillageStats(villageName);

  return (
    <VStack
      spacing={1}
      divider={breakpointValue === "base" ? <Divider /> : null}
    >
      {villageItems.map((item) => (
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
              minW={8}
              h={5}
              borderRadius="xl"
            >
              <Center>{villageStats[item.value]}</Center>
            </Badge>
          </HStack>
        </Link>
      ))}
    </VStack>
  );
};

export default LeftVillageItems;
