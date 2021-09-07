import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const tabs = [
    {
      id: 0,
      name: "Browse Villages",
      path: "/villages",
    },
    {
      id: 1,
      name: "Graduates",
      path: "/graduates",
    },
    {
      id: 2,
      name: "My Pages",
      path: "/mypages",
    },
  ];
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.path === pathname) ?? tabs[0]
  );

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Flex justifyContent="space-between" px={6} shadow="md">
          <HStack spacing={6}>
            <Logo />
            {tabs.map((tab) => (
              <Flex
                key={tab.name}
                h="70px"
                alignItems="center"
                fontSize="13px"
                fontWeight="700"
                borderBottom={activeTab.name === tab.name ? "2px" : ""}
                borderColor={activeTab.name === tab.name ? "purpleTone" : ""}
                color={activeTab.name === tab.name ? "purpleTone" : "grayText"}
              >
                <Link href={tab.path}>{tab.name}</Link>
              </Flex>
            ))}
          </HStack>
          <HStack spacing={6}>
            <Box fontSize="12px" fontWeight="800">
              ACCOUNT
            </Box>
            <Box
              w="140px"
              textAlign="center"
              color="purpleTone"
              fontSize="12px"
              fontWeight="800"
              border="1px"
              borderColor="purpleTone"
              borderRadius="6px"
            >
              <Link href="/login">LOGIN</Link>
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
                <Text fontSize="15px" fontWeight="700" mt={4}>
                  Mohammed Shah
                </Text>
                <Text fontSize="12px" fontWeight="400" color="grayText" mt={2}>
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

              <HStack spacing={8} mt={16} justifyContent="center">
                <Image src="/icons/home-twitter.svg" alt="" />
                <Image src="/icons/home-facebook.svg" alt="" />
                <Image src="/icons/home-instagram.svg" alt="" />
                <Image src="/icons/home-youtube.svg" alt="" />
              </HStack>
            </Box>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default Header;
