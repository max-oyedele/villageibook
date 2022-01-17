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

  const { villagePageStatus, village, villageVideos } = useFetchData();
  const { fetchVillageData, fetchVillagePageData } = useActionDispatch();

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
      setItemOffset(0);
    } else if (villageVideos != null && villageVideos["videos"].length == 0) {
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
              // borderRadius="md"
              // boxShadow="sm"
            >
              {pageData?.length > 0 && (
                <Box bg="white" borderRadius="md" p={4}>
                  <Text fontWeight="semibold" color="primary">
                    VIDEOS
                    <Text color="red.400" display="inline" mx={2}>
                      ({pageData.length})
                    </Text>
                  </Text>

                  <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    columnGap={4}
                    rowGap={10}
                    mt={4}
                  >
                    {pageData.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </SimpleGrid>

                  {villageVideos &&
                    villageVideos["videos"].length > itemsPerPage && (
                      <Paginate
                        handlePageClick={handlePageClicked}
                        pageCount={pageCount}
                        itemOffset={itemOffset}
                        isLast={villageVideos["videos"].length - itemsPerPage > itemOffset}
                      />
                    )}
                </Box>
              )}
              {pageData?.length == 0 && (
                <Alert message="There is no video to be displayed." />
              )}
            </Box>
          )}
        </Flex>
      </Container>

      {villageVideos?.["videos"]?.length <= 6 && (
        <Box w="full" pos="fixed" bottom={0} bg="white" mt={20}>
          <Footer />
        </Box>
      )}
      {villageVideos?.["videos"]?.length > 6 && (
        <Box bg="white" mt={20}>
          <Footer />
        </Box>
      )}
    </Fragment>
  );
};

export default Videos;
