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
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";

import HeaderForGuide from "components/HeaderForGuide";
import Footer from "components/Footer";
import TicketCard from 'components/ticket-card';
import { fetchPostJSON } from './libs/api-helpers';
import getStripe from './libs/get-stripejs';
import ReactPayPal from 'components/react-paypal';

const Checkout: NextPage = () => {
  const [confirmModal, setConfirmModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paypal, setPaypal] = useState(1)
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const modal = useDisclosure();

  const paymentWithStripe = async (amount) => {
    setLoading(true)

    // Create a Checkout Session.
    // const response = await fetchPostJSON('/api/checkout_sessions', {
    //   amount: amount,
    // })

    // if (response.statusCode === 500) {
    //   console.error(response.message)
    //   return
    // }
    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      // sessionId: response.id,
      sessionId: "20151545684",
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
  }

  const redirects = async () => {
    return [
      {
        source: '/checkout',
        destination: '/accountedit', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  }

  const raidoChange = (event) => {
    setPaypal(event.target.value);
  };

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

            <ReactPayPal amount={29.99}/>
            
            <button
              className={`h-11 hover:bg-blue-500 rounded px-5 py-2 text-md text-white font-semibold mt-10`}
              onClick={() => {
                paymentWithStripe(29.99)
              }}
              style={{ backgroundColor: '#0070ba' }}
            >
              Pay With Stripe
            </button>
            {/* <RadioGroup defaultValue="1" my={6}
              value={paypal}
              onChange={ raidoChange }
            >
              <Stack spacing={4}>
                <Radio value="1">
                  Paypal
                </Radio>
                <Radio value="2">Debit Card</Radio>
              </Stack>
            </RadioGroup>

            <Button px={12}
              onClick={() => {
                modal.onOpen();
              }}>
              Confirm
            </Button> */}
          </VStack>
        </Center>
        {/* <Modal
          closeOnOverlayClick={true}
          isCentered
          size={breakpointValue === "base" ? "full" : "2xl"}
          isOpen={modal.isOpen}
          onClose={modal.onClose}
        >
          <ModalOverlay />
          <ModalContent m={0} p={6} bgColor="white">
            <TicketCard
              setConfirmModal={setConfirmModal}
              paymentWithStripe={paypal}
            />
          </ModalContent>
        </Modal> */}
      </Container>

      <Box pos="fixed" bottom={0} w="full">
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Checkout;
