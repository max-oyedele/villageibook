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

import useFetchData from "hooks/use-fetch-data";

import { Village } from "types/schema";

const villageItems = [
  {
    id: 0,
    name: "My Pages",
    value: "users",
    img: "/icons/village-mypage.svg",
    activeBgColor: "#EFFBFA",
    badgeColor: "#36CFD1",
  },
  {
    id: 1,
    name: "Graduates",
    value: "graduates",
    img: "/icons/village-graduate.svg",
    activeBgColor: "#AD5BFF22",
    badgeColor: "#BF5AFF66",
  },
  {
    id: 2,
    name: "Society",
    value: "stories",
    img: "/icons/village-story.svg",
    activeBgColor: "#F4F4FB",
    badgeColor: "#BBBBD7",
  },
  {
    id: 3,
    name: "Personalities",
    value: "personalities",
    img: "/icons/village-personality.svg",
    activeBgColor: "#FFF9E8",
    badgeColor: "#FFB425",
  },
  {
    id: 4,
    name: "Institutions",
    value: "institutions",
    img: "/icons/village-institution.svg",
    activeBgColor: "#5B8FFF22",
    badgeColor: "#5A8FFF",
  },
  {
    id: 5,
    name: "Videos",
    value: "videos",
    img: "/icons/village-video.svg",
    activeBgColor: "#FF5B5B22",
    badgeColor: "#FF645A",
  },
];

const LeftVillageItems: React.FC<{ village: Village; badgeShow?: boolean }> = ({
  village,
  badgeShow,
}) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const {
    villageUsers,
    villageStories,
    villagePersonalities,
    villageInstitutions,
    villageVideos,
    villagePhotos,
    graduateStats,
  } = useFetchData();

  const getItemDataLength = (item) => {
    switch (item) {
      case "users":
        return villageUsers && villageUsers["users"].length;
      case "graduates":
        return graduateStats["village"]?.totalGraduates ?? 0;
      case "stories":
        return villageStories && villageStories["stories"].length;
      case "personalities":
        return (
          villagePersonalities && villagePersonalities["personalities"].length
        );
      case "institutions":
        return (
          villageInstitutions && villageInstitutions["institutions"].length
        );
      case "videos":
        return villageVideos && villageVideos["videos"].length;
      case "photos":
        return villagePhotos && villagePhotos["photos"].length;
      default:
        return 0;
    }
  };

  return (
    <VStack
      spacing={1}
      divider={breakpointValue === "base" ? <Divider /> : null}
    >
      {villageItems.map((item) => {
        const path =
          item.value != "graduates"
            ? `/village/${village?.uuid}/${item.value}`
            : `/graduates/${village?.uuid}`;
        return (
          <Link key={item.name} href={path} passHref={true}>
            <HStack
              w="full"
              h={{ base: "60px", md: "40px" }}
              spacing={4}
              bgColor={
                pathname === `/village/[id]/${item.value}`
                  ? item.activeBgColor
                  : "transparent"
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
                boxSize={breakpointValue === "base" ? "50px" : "30px"}
              />
              <Text w="full" fontSize="13px">
                {item.name}
              </Text>

              {badgeShow && (
                <Badge
                  bgColor={
                    pathname === `/village/[id]/${item.value}`
                      ? item.badgeColor
                      : "gray.100"
                  }
                  color={
                    pathname === `/village/[id]/${item.value}` ? "white" : ""
                  }
                  fontSize="11px"
                  fontWeight="400"
                  lineHeight={2}
                  px={2}
                  minW={8}
                  h={5}
                  borderRadius="xl"
                >
                  <Center>{getItemDataLength(item.value)}</Center>
                </Badge>
              )}
            </HStack>
          </Link>
        );
      })}
    </VStack>
  );
};

export default LeftVillageItems;
