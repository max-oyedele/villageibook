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
  const [itemOffset, setItemOffset] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (vid) {
      fetchVillageData({ villageUuid: vid });
      fetchVillagePageData({ villageUuid: vid });
    }
  }, [vid]);

  useEffect(() => {
    if (
      villagePersonalities != null &&
      villagePersonalities["personalities"].length > 0
    ) {
      setItemOffset(0);
    } else if (
      villagePersonalities != null &&
      villagePersonalities["personalities"].length == 0
    ) {
      setPageData([]);
    }
  }, [villagePersonalities && villagePersonalities["personalities"]]);

  const handlePageClicked = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) %
      villagePersonalities["personalities"].length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (
      villagePersonalities != null &&
      villagePersonalities["personalities"].length > 0
    ) {
      const endOffset = itemOffset + itemsPerPage;
      setPageData(
        villagePersonalities["personalities"].slice(itemOffset, endOffset)
      );
      setPageCount(
        Math.ceil(villagePersonalities["personalities"].length / itemsPerPage)
      );
    }
  }, [itemOffset, itemsPerPage]);

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
              {villagePersonalities &&
                villagePersonalities["personalities"].length > itemsPerPage && (
                  <Paginate
                    handlePageClick={handlePageClicked}
                    pageCount={pageCount}
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
