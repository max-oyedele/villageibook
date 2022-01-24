import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Container,
  HStack,
  VStack,
  Flex,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import PersonalityCard from "components/PersonalityCard";
import Alert from "components/widgets/Alert";
import Loader from "components/widgets/Loader";
import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import Paginate from "components/Paginate";

const Personalities: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid
  const { fixed } = useWindowProp();
  const { villagePageStatus, village, villagePersonalities } = useFetchData();
  const { fetchVillageData, fetchVillagePageData } = useActionDispatch();
  const [pageData, setPageData] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    if (vid) {
      fetchVillageData({ villageUuid: vid });
      fetchVillagePageData({ villageUuid: vid });
    }
  }, [vid]);

  useEffect(() => {
    if (pageData == null && villagePersonalities?.["personalities"]?.length <= itemsPerPage)
      setPageData(villagePersonalities["personalities"].slice(0, itemsPerPage));
  }, [villagePersonalities?.["personalities"]]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Personalities" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={village} fixed={fixed} />
            </Box>
          )}
          {villagePageStatus === 'loading' && <Loader />}
          {villagePageStatus !== 'loading' && (
            <Box
              w="full"
              ml={
                fixed && breakpointValue === "md"
                  ? "264px"
                  : breakpointValue === "md"
                  ? "24px"
                  : "0px"
              }
            >
              <VStack spacing={2}>
                {pageData?.length > 0 &&
                  pageData.map((personality) => (
                    <PersonalityCard
                      key={personality.id}
                      personality={personality}
                    />
                  ))}
              </VStack>
              {pageData?.length == 0 && (
                <Alert message="There is no personality to be displayed." />
              )}
              {villagePersonalities?.["personalities"]?.length > itemsPerPage && (
                  <Paginate
                    data={villagePersonalities["personalities"]}
                    pageData={setPageData}
                  />
                )}
            </Box>
          )}
        </Flex>
      </Container>

      {villagePersonalities?.["personalities"]?.length <= 2 && (
        <Box w="full" pos="fixed" bottom={0} bg="white" mt={20}>
          <Footer />
        </Box>
      )}
      {villagePersonalities?.["personalities"]?.length > 2 && (
        <Box bg="white" mt={20}>
          <Footer />
        </Box>
      )}
    </Fragment>
  );
};

export default Personalities;
