import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { BiMenu, BiX } from "react-icons/bi";
import {
  Flex,
  Box,
  Text,
  useBreakpointValue,
  IconButton,
  HStack,
  VStack,
  StackDivider,
  Avatar,
  Image,
  Button,
  Progress,
} from "@chakra-ui/react";

import Logo from "components/Logo";
import SocialLinkBar from "components/SocialLinkBar";

import { OurStore } from "rdx/store";
import { reset } from "rdx/slices/auth";
import { Status, Register } from "rdx/types";

const tabs = [
  {
    id: 0,
    name: "Browse",
    path: "/",
  },
  {
    id: 1,
    name: "Village",
    path: "/myvillage",
  },
  {
    id: 2,
    name: "Graduates",
    path: "/graduates",
  },
];

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  const { status } = useSelector((state: OurStore) => state.authReducer);

  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const [activeTab, setActiveTab] = useState(
      pathname === "/"
      ? tabs[0] 
      : pathname.includes("myvillage")
      ? tabs[1]
      : pathname.includes("graduates")
      ? tabs[2]
      : null
  );

  const logout = () => {
    dispatch(reset());
    removeCookie("jwt");
    router.push("/");
  };

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Box pos="sticky" top={0} zIndex={10}>
          <Flex bg="white" justifyContent="space-between" px={6} shadow="md">
            <HStack spacing={6} mr={1}>
              <Logo />
              {tabs.map((tab) => (
                <Link key={tab.name} href={tab.path}>
                  <Flex
                    h="55px"
                    alignItems="center"
                    fontSize="14px"
                    borderBottom={activeTab?.name === tab.name ? "2px" : ""}
                    borderColor={
                      activeTab?.name === tab.name ? "purpleTone" : ""
                    }
                    color={
                      activeTab?.name === tab.name ? "purpleTone" : "GrayText"
                    }
                    cursor="pointer"
                  >
                    {tab.name}
                  </Flex>
                </Link>
              ))}
            </HStack>
            <HStack spacing={6} ml={1}>
              <Flex h="full" alignItems="center" fontSize="12px" borderBottom={pathname.includes("accountedit") ? "2px" : ""} borderColor={pathname.includes("accountedit") ? "purpleTone": ""}>
                <Link href="/accountedit"><Text mt={1} cursor="pointer">ACCOUNT</Text></Link>
              </Flex>
              <Box
                px={4}
                h="24px"
                textAlign="center"
                color="purpleTone"
                fontSize="12px"
                border="1px"
                borderColor="purpleTone"
                borderRadius="6px"
                cursor="pointer"
                onClick={() => logout()}
              >
                <Text>LOGOUT</Text>
              </Box>
            </HStack>
          </Flex>

          {status === Status.LOADING && (
            <Box w="full">
              <Progress h="2px" size="xs" isIndeterminate />
            </Box>
          )}
        </Box>
      )}

      {breakpointValue === "base" && (
        <Box>
          <Flex
            h="55px"
            justifyContent="space-between"
            alignItems="center"
            px={6}
          >
            <Logo />
            <IconButton
              aria-label=""
              icon={showMenuMobile ? <BiX /> : <BiMenu />}
              fontSize="26px"
              onClick={() => setShowMenuMobile(!showMenuMobile)}
            />
          </Flex>

          {showMenuMobile && (
            <Box
              pos="fixed"
              top="55px"
              left="0"
              w="full"
              h="100vh"
              bgColor="white"
              zIndex="10"
            >
              <Flex w="full" flexDirection="column" alignItems="center" mt={10}>
                <Avatar size="lg" src="/images/mohammed-shah.png" />
                <Text fontSize="15px" mt={4} textTransform="capitalize">
                  Mohammed Shah
                </Text>
                <Text
                  fontSize="12px"
                  fontWeight="400"
                  color="GrayText"
                  mt={2}
                  textTransform="capitalize"
                >
                  Jammura
                </Text>
              </Flex>
              <VStack divider={<StackDivider />} mt={8}>
                {tabs.map((tab) => (
                  <Flex
                    key={tab.name}
                    h="55px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Link href={tab.path}>{tab.name}</Link>
                  </Flex>
                ))}
              </VStack>

              <Box mt={16}>
                <SocialLinkBar />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default Header;
