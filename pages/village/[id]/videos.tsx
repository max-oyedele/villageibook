import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Container,
  HStack,
  Flex,
  Box,
  Text,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import VideoCard from "components/VideoCard";
import Alert from "components/widgets/Alert";
import Loader from "components/widgets/Loader";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

import Paginate from "components/Paginate";

const Videos: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { fixed } = useWindowProp();

  const { village, villageVideos } = useFetchData();
  const { fetchVillageData, fetchVillagePageData } = useActionDispatch();

  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const [itemOffset, setItemOffset] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (vid) {
      fetchVillageData({ villageUuid: vid });
      fetchVillagePageData({ villageUuid: vid });
    }
  }, [vid]);

  useEffect(() => {
    if (villageVideos != null && villageVideos["videos"].length > 0) {
      setLoading(false);
      setItemOffset(0);
    } else if (villageVideos != null && villageVideos["videos"].length == 0) {
      setLoading(false);
      setPageData([]);
    }
  }, [villageVideos && villageVideos["videos"]]);

  const handlePageClicked = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % villageVideos["videos"].length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (villageVideos != null && villageVideos["videos"].length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setPageData(villageVideos["videos"].slice(itemOffset, endOffset));
      setPageCount(Math.ceil(villageVideos["videos"].length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Videos" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={village} fixed={fixed} />
            </Box>
          )}

          {loading && <Loader loading={loading} />}
          {!loading && (
            <Box
              w="full"
              bg="white"
              ml={
                fixed && breakpointValue === "md"
                  ? "264px"
                  : breakpointValue === "md"
                  ? "24px"
                  : "0px"
              }
              borderRadius="md"
              boxShadow="sm"
              p={4}
            >
              <Text fontWeight="semibold" color="primary">
                VIDEOS
                {pageData?.length && (
                  <Text color="red.400" display="inline" mx={2}>
                    ({pageData.length})
                  </Text>
                )}
              </Text>
              {pageData?.length > 0 && (
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  columnGap={4}
                  rowGap={10}
                  mt={4}
                >
                  {pageData.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}

                  {pageData?.length == 0 && (
                    <Alert message="There is no video to be displayed." />                    
                  )}
                </SimpleGrid>
              )}
              {villageVideos &&
                villageVideos["videos"].length > itemsPerPage && (
                  <Paginate
                    handlePageClick={handlePageClicked}
                    pageCount={pageCount}
                  />
                )}
            </Box>
          )}
        </Flex>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default Videos;
