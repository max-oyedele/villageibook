import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

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

const HeaderForGuide: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  const { pathname } = router;

  const { status, register, jwt, user, error } = useSelector(
    (state: OurStore) => state.authReducer
  );

  const dispatch = useDispatch();
  
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Box>
          <Flex
            sx={{ position: "sticky", top: 0, zIndex: 10 }}
            bg="white"
            justifyContent="space-between"
            alignItems="center"
            h="55px"
            px={6}
            shadow="md"
          >
            <Logo />
            <Text>{title}</Text>
            <Box></Box>
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

export default HeaderForGuide;
