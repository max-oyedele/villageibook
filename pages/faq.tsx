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
import ContactCard from "components/ContactCard";

import { faqs } from "data/faq";

const Faq: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [expandedFaq, setExpandedFaq] = useState(faqs[0]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <HStack h={24}>
          <PageTitle title="FAQ" />
        </HStack>

        <HStack spacing={6} align="start">
          {breakpointValue === "md" && (
            <Box w={{base: "30%", sm: "25%"}}>
              <ContactCard />
            </Box>
          )}

          <Box w="full">
            {breakpointValue === "base" && <ContactCard />}
            <Accordion
              allowToggle
              w="full"
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
                  mb={4}
                >
                  <AccordionButton h={14}>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="16px"
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
                    <Box w="full" p={6}>
                      asdfasdf
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </HStack>
      </Container>

      <Box w="full" pos="fixed" bottom={0}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Faq;
