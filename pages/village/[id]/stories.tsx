import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Container,
  HStack,
  VStack,
  Flex,
  Box,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import StoryCard from "components/StoryCard";
import Alert from "components/widgets/Alert";
import Loader from "components/widgets/Loader";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import Paginate from "components/Paginate";

const Story: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const { query } = router;
  const vid = query.id;

  const { fixed } = useWindowProp();

  const { villagePageStatus, village, villageStories } = useFetchData();
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
    if (villageStories != null && villageStories["stories"].length > 0) {
      setItemOffset(0);
    } else if (
      villageStories != null &&
      villageStories["stories"].length == 0
    ) {
      setPageData([]);
    }
  }, [villageStories && villageStories["stories"]]);

  const handlePageClicked = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % villageStories["stories"].length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (villageStories != null && villageStories["stories"].length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setPageData(villageStories["stories"].slice(itemOffset, endOffset));
      setPageCount(Math.ceil(villageStories["stories"].length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Society" />
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
              {pageData?.length > 0 && (
                <Box bgColor="white" p={6}>
                  <Grid
                    templateColumns={
                      breakpointValue === "base"
                        ? "repeat(1, 1fr)"
                        : "repeat(2, 1fr)"
                    }
                    columnGap={6}
                    rowGap={12}
                  >
                    {pageData.map((story) => (
                      <StoryCard key={story.uuid} story={story} />
                    ))}
                  </Grid>
                </Box>
              )}
              {pageData?.length == 0 && (
                <Alert message="There is no story to be displayed." />
              )}
              {villageStories &&
                villageStories["stories"].length > itemsPerPage && (
                  <Paginate
                    handlePageClick={handlePageClicked}
                    pageCount={pageCount}
                  />
                )}
            </Box>
          )}
        </Flex>
      </Container>

      {villageStories?.["stories"]?.length <= 2 && (
        <Box w="full" pos="fixed" bottom={0} bg="white" mt={20}>
          <Footer />
        </Box>
      )}
      {villageStories?.["stories"]?.length > 2 && (
        <Box bg="white" mt={20}>
          <Footer />
        </Box>
      )}
    </Fragment>
  );
};

export default Story;
