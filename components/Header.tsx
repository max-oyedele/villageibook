import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import cookie from "cookie";

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
} from "@chakra-ui/react";

import Logo from "components/Logo";
import SocialLinkBar from "components/SocialLinkBar";
import { tabs } from "constants/headerTabs";
import { OurStore } from "rdx/store";

import { reset } from "rdx/slices/auth";

const Header = ({jwt}) => {
  const router = useRouter();
  const { pathname } = router;

  const { user } = useSelector(
    (state: OurStore) => state.authReducer
  );
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"])
  const [isAuth, setIsAuth] = useState(!!jwt)

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.path === pathname) ?? tabs[0]
  );

  const logout = () => {
    dispatch(reset());
    removeCookie("jwt");
    setIsAuth(null);
    location.reload();
  }

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Flex sx={{position: 'sticky', top: 0, zIndex:10 }} bg="white" justifyContent="space-between" px={6} shadow="md">
          <HStack spacing={6} mr={1}>
            <Logo />
            {tabs.map((tab) => (
              <Flex
                key={tab.name}
                h="50px"
                alignItems="center"
                fontSize="13px"
                borderBottom={activeTab.name === tab.name ? "2px" : ""}
                borderColor={activeTab.name === tab.name ? "purpleTone" : ""}
                color={activeTab.name === tab.name ? "purpleTone" : "GrayText"}
              >
                <Link href={tab.path}>{tab.name}</Link>
              </Flex>
            ))}
          </HStack>
          <HStack spacing={6} ml={1}>
            <Box fontSize="12px">
              <Link href="/account">ACCOUNT</Link>
            </Box>
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
              onClick={() => {
                isAuth || user ? logout() : router.push("/login");
              }}
            >
              {!isAuth && !user && <Text>LOGIN</Text>}
              {(isAuth || user) && <Text>LOGOUT</Text>}
            </Box>
          </HStack>
        </Flex>
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
                <Text
                  fontSize="15px"
                  mt={4}
                  textTransform="capitalize"
                >
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