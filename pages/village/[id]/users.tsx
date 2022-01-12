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
import UserCard from "components/UserCard";
import Alert from "components/widgets/Alert";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Paginate from "components/Paginate";

const Users: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { fixed } = useWindowProp();

  const { village, villageUsers } = useFetchData();
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
      fetchVillagePageData({ villageUuid: vid });
    }
  }, [vid]);
  
  useEffect(() => {
    if (villageUsers != null && villageUsers['users'].length > 0) {
      setLoading(false);
      setItemOffset(0);
    } else if (villageUsers != null && villageUsers['users'].length == 0) {
      setLoading(false);
      setPageData([]);
    }
  }, [villageUsers && villageUsers['users']]);

  const handlePageClicked = event => {
    const newOffset = (event.selected * itemsPerPage) % villageUsers['users'].length;
    setItemOffset(newOffset);
  };
  
  useEffect(() => {
    if (villageUsers != null && villageUsers['users'].length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setPageData(villageUsers['users'].slice(itemOffset, endOffset));
      setPageCount(Math.ceil(villageUsers['users'].length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="MyPages" />
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
              <VStack spacing={2}>
                {pageData?.length > 0 &&
                  pageData.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                {pageData?.length == 0 && (
                  <Alert message="There is no user to be displayed." />
                )}
              </VStack>
              { villageUsers && villageUsers['users'].length > itemsPerPage && 
                <Paginate 
                  handlePageClick={handlePageClicked}
                  pageCount={pageCount}
                />
              }
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

export default Users;
