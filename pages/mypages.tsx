import { Fragment } from "react";
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
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import MyVillageCard from "components/MyVillageCard";
import MyPageCard from "components/MyPageCard";
import VillageGraduatesCard from "components/VillageGraduatesCard";
import SocietyCard from "components/SocietyCard";
import PersonalityCard from "components/PersonalityCard";
import InstitutionCard from "components/InstitutionCard";
import VideoCard from "components/VideoCard";
import FilterCard from "components/FilterCard";

import {
  totalGraduates,
  villageName,
  villageGraduates,
  countryGraduates,
} from "data";
import {
  myPages,
  societies,
  personalities,
  institutions,
  videos,
} from "data/myPages";

const MyPages: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Header />
      <Container maxW="full" p={6}>
        <Box mt={4}>
          <PageTitle title={`My Village: ${villageName}`} />
        </Box>
        <HStack spacing={6} mt={12} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <MyVillageCard />
              <Text fontSize="26px" fontWeight="bold" my={10}>
                Filters
              </Text>
              <Box bgColor="white" borderRadius="6px" px={4} py={8}>
                <FilterCard />
              </Box>
            </Box>
          )}

          <Box w="full">
            <Box bgColor="white" p={6}>
              <Text fontSize="14px" fontWeight="600">
                MY PAGES
                <Text display="inline" color="#36CFD1" ml={1}>
                  ({myPages.length})
                </Text>
              </Text>
              <VStack spacing={2} mt={6}>
                {myPages.map((myPage) => (
                  <MyPageCard key={myPage.id} myPage={myPage} />
                ))}
              </VStack>
              <Box>
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  color="purpleTone"
                  textAlign="center"
                  mt={8}
                >
                  SEE ALL MY PAGES ({myPages.length})
                </Text>
              </Box>
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px" fontWeight="600">
                VILLAGE GRADUATES
                <Text display="inline" color="purpleTone" ml={1}>
                  ({villageGraduates})
                </Text>
              </Text>
              <Divider mt={6} mb={8} />
              <VillageGraduatesCard
                totalGraduates={totalGraduates}
                villageName={villageName}
                villageGraduates={villageGraduates}
                countryGraduates={countryGraduates}
              />
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px" fontWeight="600">
                SOCIETY
                <Text display="inline" color="grayText" ml={1}>
                  ({societies.length})
                </Text>
              </Text>
              <Grid
                templateColumns="repeat(2, 1fr)"
                columnGap={6}
                rowGap={10}
                mt={6}
              >
                {societies.map((society) => (
                  <SocietyCard key={society.id} society={society} />
                ))}
              </Grid>
              <Divider my={10} />
              <Box>
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  color="purpleTone"
                  textAlign="center"
                >
                  SEE ALL POST ({societies.length})
                </Text>
              </Box>
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px" fontWeight="600">
                PERSONALITIES
                <Text display="inline" color="#FFC418" ml={1}>
                  ({personalities.length})
                </Text>
              </Text>
              <VStack spacing={2} mt={6}>
                {personalities.map((personality) => (
                  <PersonalityCard
                    key={personality.id}
                    personality={personality}
                  />
                ))}
              </VStack>
              <Box>
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  color="purpleTone"
                  textAlign="center"
                  mt={8}
                >
                  SEE ALL PERSONALITIES ({personalities.length})
                </Text>
              </Box>
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px" fontWeight="600">
                INSTITUTIONS
                <Text display="inline" color="#FFC418" ml={1}>
                  ({institutions.length})
                </Text>
              </Text>
              <VStack spacing={2} mt={6}>
                {institutions.map((institution) => (
                  <InstitutionCard
                    key={institution.id}
                    institution={institution}
                  />
                ))}
              </VStack>
              <Box>
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  color="purpleTone"
                  textAlign="center"
                  mt={8}
                >
                  SEE ALL INSTITUTIONS ({institutions.length})
                </Text>
              </Box>
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px" fontWeight="600">
                VIDEOS
                <Text display="inline" color="#FFC418" ml={1}>
                  ({videos.length})
                </Text>
              </Text>
              <Grid
                templateColumns="repeat(3, 1fr)"
                columnGap={4}
                rowGap={10}
                mt={6}
              >
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </Grid>
              <Divider mt={10} mb={6} />
              <Box>
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  color="purpleTone"
                  textAlign="center"
                >
                  SEE ALL VIDEOS ({videos.length})
                </Text>
              </Box>
            </Box>
          </Box>
        </HStack>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default MyPages;
