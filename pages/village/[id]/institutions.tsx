import { Fragment, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Container,
  VStack,
  Flex,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import InstitutionCard from "components/InstitutionCard";
import Alert from "components/widgets/Alert";
import Loader from "components/widgets/Loader";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import Paginate from "components/Paginate";

const Institutions: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { fixed } = useWindowProp();

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { village, villageInstitutions } = useFetchData();
  const { fetchVillageData, fetchVillagePageData } = useActionDispatch();

  const [loading, setLoading] = useState(true);
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
      villageInstitutions != null &&
      villageInstitutions["institutions"].length > 0
    ) {
      setLoading(false);
      setItemOffset(0);
    } else if (
      villageInstitutions != null &&
      villageInstitutions["institutions"].length == 0
    ) {
      setLoading(false);
      setPageData([]);
    }
  }, [villageInstitutions && villageInstitutions["institutions"]]);

  const handlePageClicked = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) %
      villageInstitutions["institutions"].length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (
      villageInstitutions != null &&
      villageInstitutions["institutions"].length > 0
    ) {
      const endOffset = itemOffset + itemsPerPage;
      setPageData(
        villageInstitutions["institutions"].slice(itemOffset, endOffset)
      );
      setPageCount(
        Math.ceil(villageInstitutions["institutions"].length / itemsPerPage)
      );
    }
  }, [itemOffset, itemsPerPage]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Institutions" />
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
                  pageData.map((institution) => (
                    <InstitutionCard
                      key={institution.id}
                      institution={institution}
                    />
                  ))}
              </VStack>
              {pageData?.length == 0 && (
                <Alert message="There is no institution to be displayed." />
              )}
              {villageInstitutions &&
                villageInstitutions["institutions"].length > itemsPerPage && (
                  <Paginate
                    handlePageClick={handlePageClicked}
                    pageCount={pageCount}
                  />
                )}
            </Box>
          )}
        </Flex>
      </Container>

      <Box pos="fixed" bottom={0} w="full" bg="white">
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Institutions;
