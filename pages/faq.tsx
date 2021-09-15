import React, { Fragment, useState } from "react";
import type { NextPage } from "next";

import {
  Container,
  HStack,
  VStack,
  Divider,
  Flex,
  Box,
  Text,
  Image,
  Avatar,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  SimpleGrid,
  Input,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";

import { faqs } from "data/faq";

const Faq: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [expandedFaq, setExpandedFaq] = useState(faqs[0]);

  return (
    <Fragment>
      <Header jwt={null} />
      <Container maxW="full" px={6}>
        <HStack h={24}>
          <PageTitle title="FAQ" />
        </HStack>

        <HStack spacing={6} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <Box pos="relative">
                <Image
                  src="/images/email-card.png"
                  w="full"
                  fit="cover"
                  alt=""
                />
                <Box pos="absolute" top="70%" left="10%">
                  <Button
                    w="110px"
                    h="30px"
                    variant="outline"
                    color="white"
                    fontSize="10px"
                    fontWeight="800"
                  >
                    EMAIL NOW
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          <Box w="full">
            <Accordion
              allowToggle
              w="full"
              bgColor="white"
              defaultIndex={0}
              // onChange={(index) => {
              //   typeof index === "number"
              //     ? setExpandedDistrict(districtGraduates[index])
              //     : setExpandedDistrict(districtGraduates[index[0]]);
              // }}
            >
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  id={faq.id.toString()}
                  border="none"
                  bgColor="white"
                  mt={4}
                >
                  <AccordionButton h={14}>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="16px"
                      fontWeight="700"
                      textTransform="capitalize"
                      color={
                        faq.id === expandedFaq?.id ? "purpleTone" : "primary"
                      }
                    >
                      {faq.title}
                    </Box>

                    <AccordionIcon ml={4} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Divider />
                    <Box w="300px" mt={6} mb={10} ml={6}>
                      asdfasdf
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </HStack>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Faq;
