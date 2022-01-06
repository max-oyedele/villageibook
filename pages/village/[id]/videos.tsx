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

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Videos: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { fixed } = useWindowProp();

  const { village, villageVideos, fetchVillageData, fetchVillagePageData } = useFetchData();
  
  const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;
  
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#553cfb");

  useEffect(() => {
    if (vid) {
      fetchVillageData({ villageUuid: vid });
      fetchVillagePageData({ villageUuid: vid });
    }
  }, [vid]);

  if (villageVideos && villageVideos.length > 0 && loading) {
    setLoading(false)
  }

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
              {villageVideos.length > 0 && (
                <SimpleGrid
                  columns={{ base: 2, md: 3 }}
                  columnGap={4}
                  rowGap={10}
                  bgColor="white"
                  border="1px"
                  borderRadius="8px"
                  borderColor="gray.200"
                  p={4}
                >
                  {villageVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </SimpleGrid>
              )}
              {villageVideos.length == 0 && (
                <Alert message="There is no video to be displayed." />
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

export default Videos;
