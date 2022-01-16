import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { BiMenu, BiX } from "react-icons/bi";
import {
  Container,
  Flex,
  Box,
  Center,
  Text,
  useBreakpointValue,
  IconButton,
  HStack,
  VStack,
  StackDivider,
  Progress,
} from "@chakra-ui/react";

import Logo from "components/Logo";
import SocialLinkBar from "components/SocialLinkBar";

import { removeUserToken} from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

import { Status } from "rdx/types";

const tabs = [
  {
    id: 0,
    name: "Feed",
    path: "/feed",
  },
  {
    id: 1,
    name: "Village",
    path: "/village",
  },
  {
    id: 2,
    name: "Graduates",
    path: "/graduates",
  },
];

const Header = () => {
  const router = useRouter();
  const {
    pathname,
    query: { id },
  } = router;

  const { authStatus, me } = useFetchData();
  const { authReset, accountReset } = useActionDispatch();

  const vid = id ?? me?.comesFrom?.uuid;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const [activeTab, setActiveTab] = useState(
    pathname === "/feed"
      ? tabs[0]
      : pathname.includes("village")
        ? tabs[1]
        : pathname.includes("graduates")
          ? tabs[2]
          : null
  );
  
  const logout = () => {
    authReset();
    accountReset();
    removeUserToken();
    localStorage.removeItem("villageibookAccount");
    router.push("/");
  };

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Box bg="white" pos="sticky" top={0} zIndex={10} shadow="sm">
          <Container maxW="container.xl" px={6}>
            <Flex justifyContent="space-between">
              <HStack spacing={6} mr={1}>
                <Logo />
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={
                      tab.path === "/village" || tab.path === "/graduates" ? `${tab.path}/${vid}` : tab.path
                    }
                    passHref={true}
                  >
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
                <HStack
                  h="full"
                  spacing={4}
                  fontSize="12px"
                >
                  {me?.roles?.includes('ADMIN') && (
                    <Link href="/admin/posts" passHref={true}>
                      <Text cursor="pointer">ADMIN</Text>
                    </Link>
                  )}
                  <Center
                    h="full"
                    borderBottom={pathname.includes("accountedit") ? "2px" : ""}
                    borderColor={
                      pathname.includes("accountedit") ? "purpleTone" : ""
                    }
                  >
                    <Link href="/accountedit" passHref={true}>
                      <Text cursor="pointer">ACCOUNT</Text>
                    </Link>
                  </Center>
                </HStack>
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
          </Container>

          {authStatus === Status.LOADING && (
            <Box w="full">
              <Progress h="2px" size="xs" isIndeterminate />
            </Box>
          )}
        </Box>
      )}

      {breakpointValue === "base" && (
        <Box>
          <Flex
            pos="fixed"
            top={0}
            zIndex={20}
            w="full"
            h="55px"
            justifyContent="right"
            alignItems="center"
            px={6}
          >
            {/* <Logo /> */}
            <IconButton
              aria-label=""
              icon={showMenuMobile ? <BiX /> : <BiMenu />}
              fontSize="26px"
              bgColor="gray.400"
              onClick={() => setShowMenuMobile(!showMenuMobile)}
            />
          </Flex>

          {showMenuMobile && (
            <Box
              pos="fixed"
              top={0}
              left={0}
              w="full"
              h="100vh"
              bgColor="white"
              zIndex="10"
            >
              <VStack divider={<StackDivider />} mt={8}>
                {tabs
                  .concat([
                    {
                      id: 3,
                      name: "Account",
                      path: "/accountedit",
                    },
                    {
                      id: 4,
                      name: "Logout",
                      path: "/signout",
                    },
                  ])
                  .map((tab) => (
                    <Flex
                      key={tab.name}
                      h="55px"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Link
                        href={
                          tab.path === "/village"
                            ? `${tab.path}/${vid}`
                            : tab.path
                        }
                      >
                        {tab.name}
                      </Link>
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
