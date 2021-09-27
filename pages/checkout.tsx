import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import {
  Container,
  Flex,
  Box,
  Text,
  Stack,
  HStack,
  VStack,
  Divider,
  Button,
  Image,
  Textarea,
  AspectRatio,
  Center,
  Circle,
  Progress,
  RadioGroup,
  Radio,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";

import HeaderForGuide from "components/HeaderForGuide";
import Footer from "components/Footer";

const Checkout: NextPage = () => {
  return (
    <Fragment>
      <HeaderForGuide title="CHECKOUT" />
      <Container maxW="container.xl" px={6}>
        <Center w="full" mt={12}>
          <VStack
            spacing={12}
            px={24}
            py={12}
            bgColor="white"
            border="1px"
            borderRadius="8px"
            borderColor="gray.200"
          >
            <Text fontSize="32px">$29.99</Text>

            <RadioGroup defaultValue="1" my={6}>
              <Stack spacing={4}>
                <Radio value="1">
                  Paypal
                </Radio>
                <Radio value="2">Debit Card</Radio>
              </Stack>
            </RadioGroup>

            <Button bgColor="purpleTone" color="white" px={12}>
              Confirm
            </Button>
          </VStack>
        </Center>
      </Container>

      <Box pos="fixed" bottom={0} w="full">
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Checkout;
