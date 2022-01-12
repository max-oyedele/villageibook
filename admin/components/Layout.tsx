import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  Portal,
  Center,
  Circle,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaHome, FaThList, FaRegMoneyBillAlt, FaUserFriends } from "react-icons/fa";

import Logo from "components/Logo";

var menus = [  
  {
    path: "/admin/posts",
    name: "Post",
    icon: FaThList,
  },
  {
    path: "/admin/stories",
    name: "Story",
    icon: FaRegMoneyBillAlt,
  },
  {
    path: "/admin/personalities",
    name: "Personality",
    icon: FaRegMoneyBillAlt,
  },
  {
    path: "/admin/institutions",
    name: "Institution",
    icon: FaRegMoneyBillAlt,
  },
  {
    path: "/admin/videos",
    name: "Video",
    icon: FaRegMoneyBillAlt,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: FaUserFriends,
  },
];

export default function Layout(props) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  let activeBg = useColorModeValue("white", "gray.700");
  let inactiveBg = useColorModeValue("white", "gray.700");
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue("gray.400", "gray.400");
  let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

  const activeMenu = (menuName) => {
    return router.pathname === menuName ? "active" : "";
  };

  return (
    <Fragment>
      <Box
        pos="fixed"
        w="260px"
        h="calc(100vh - 32px)"
        margin={{ sm: "16px" }}
        transition="0.2s linear"
      >
        <Box pt={"25px"} mb="12px">
          <Link href="/" passHref={true}>
            <Center
              lineHeight="100%"
              mb="30px"
              fontWeight="bold"
              fontSize="11px"
            >
              <Logo />
              <Text fontSize="sm" mt="3px" mx={4}>
                ADMIN
              </Text>
            </Center>
          </Link>
          <Separator></Separator>
        </Box>

        {menus?.map((menu, key) => {
          const isActive = activeMenu(menu.path) === "active";
          return (
            <Link key={key} href={menu.path} passHref={true}>
              <Button
                boxSize="initial"
                justifyContent="flex-start"
                alignItems="center"
                boxShadow={sidebarActiveShadow}
                bg={isActive ? activeBg : "transparent"}
                transition="0.2s linear"
                mb={{ xl: "12px" }}
                // mx={{ xl: "auto" }}
                py="12px"
                borderRadius="15px"
                // _hover="none"
                w="100%"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: isActive
                    ? "0px 7px 11px rgba(0, 0, 0, 0.04)"
                    : "none",
                }}
              >
                <Flex>
                  <Circle
                    bg={isActive ? "teal.300" : inactiveBg}
                    color={isActive ? "white" : "teal.300"}
                    size="30px"
                    me="12px"
                    transition="0.2s linear"
                  >
                    <menu.icon />
                  </Circle>
                  <Text
                    color={isActive ? activeColor : inactiveColor}
                    my="auto"
                    fontSize="sm"
                  >
                    {menu.name}
                  </Text>
                </Flex>
              </Button>
            </Link>
          );
        })}
      </Box>

      <Box w="calc(100vw-292px)" ml="292px" p="16px">{props.children}</Box>
    </Fragment>
  );
}

function Separator(props) {
  const { variant, children, ...rest } = props;
  return (
    <Flex
      h="1px"
      w="100%"
      bg="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)"
      {...rest}
    >
      {children}
    </Flex>
  );
}
