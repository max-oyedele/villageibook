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

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Paginate from "components/Paginate";

const Story: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { fixed } = useWindowProp();

  const { village, villageStories } = useFetchData();
  const { fetchVillageData, fetchVillagePageData } = useActionDispatch();

  const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;
  
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#553cfb");
  const [pageData, setPageData] = useState(null);
  const [itemOffset, setItemOffset] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (vid) {
      fetchVillageData({ villageUuid: vid });
      fetchVillagePageData({ villageUuid: vid })
    }
  }, [vid])

  if (villageStories && loading) {
    setLoading(false);
    setItemOffset(0);
  }

  const handlePageClicked = event => {
    const newOffset = (event.selected * itemsPerPage) % villageStories.length;
    setItemOffset(newOffset);
  };
  
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPageData(villageStories.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(villageStories.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Story" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={village} fixed={fixed} />
            </Box>
          )}

          { !loading ?
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
              {pageData?.length > 0 && (
                <Paginate 
                  handlePageClick={handlePageClicked}
                  pageCount={pageCount}
                />
              )}
              {pageData?.length == 0 && (
                <Alert message="There is no story to be displayed." />
              )}
            </Box> :
          <ScaleLoader color={color} loading={loading} css={override} /> }
        </Flex>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default Story;
