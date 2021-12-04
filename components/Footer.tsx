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
import SocialLinkBar from "components/SocialLinkBar";

const tabs = [
  {
    id: 0,
    name: "Privacy",
    path: "/privacy",
  },
  {
    id: 1,
    name: "Legal",
    path: "/legal",
  },
  {
    id: 2,
    name: "Faq",
    path: "/faq",
  },
  {
    id: 3,
    name: "Contact Us",
    path: "mailto:info@skillhet.com",
  },
];

const Footer = () => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.path === pathname) ?? tabs[0]
  );

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Flex
          bottom={0}
          w="full"
          h="150px"
          // bgColor="grayBg"
          justifyContent="end"
          borderTop="1px"
          borderColor="gray.100"
          px={6}
        >
          {/* <HStack spacing={6}>
            <Box>
              <Text fontSize="11px" fontWeight="400" color="GrayText">
                Copyright @ 2021, All rights reserved.
              </Text>
              <Box mt={4}>
                <SocialLinkBar />
              </Box>
            </Box>
          </HStack> */}
          <HStack spacing={6}>
            {tabs.map((tab) => (
              <Link key={tab.name} href={tab.path} passHref>
                <Text fontSize="13px" color="GrayText" cursor="pointer" _hover={{color: "purpleTone"}}>
                  {tab.name}
                </Text>
              </Link>
            ))}
          </HStack>
        </Flex>
      )}
    </Fragment>
  );
};

export default Footer;
