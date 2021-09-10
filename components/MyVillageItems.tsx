import { useRouter } from "next/router";
import {
  HStack,
  VStack,
  Divider,
  Image,
  Text,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";

import { myVillageItems } from "constants/myVillageItems";
import { myVillageStats } from "data/myPages";

const MyVillageItems:React.FC<{role?: string}> = ({role}) => {
  const router = useRouter();
  const {pathname} = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <VStack
      spacing={2}
      divider={breakpointValue === "base" ? <Divider /> : <></>}
    >
      {myVillageItems.map((item) => (
        <HStack
          key={item.name}
          w="full"
          h={{ base: "60px", md: "40px" }}
          spacing={4}
          bgColor={item.path === pathname ? item.activeBgColor : 'transparent'}
          borderRadius="8px"
          px={2}
          cursor="pointer"
          _hover={{
            bgColor: "gray.100"
          }}
        >
          <Image
            src={item.img}
            alt=""
            w={{ base: "50px", md: "30px" }}
            h={{ base: "50px", md: "30px" }}
          />
          <Text w="full" fontSize="13px" fontWeight="bold">
            {item.name}
          </Text>
          {
            role === 'registered' && 
            <Badge bgColor={item.path === pathname ? item.badgeColor : '#FBFBFA'} color={item.path === pathname ? 'white' : ''} fontSize="10px" px={2} borderRadius="xl">{myVillageStats[item.value]}</Badge>
          }
        </HStack>
      ))}
    </VStack>
  );
};

export default MyVillageItems;
