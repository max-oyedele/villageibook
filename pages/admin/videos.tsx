import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  useColorMode,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";

import { useTable, useSortBy } from 'react-table';

import Layout from "admin/components/Layout";
import ImageBox from "components/widgets/ImageBox";
import VideoBox from "components/widgets/VideoBox";
import VillageSearchBox from "admin/components/VillageSearchBox";
import VideoForm from "admin/components/VideoForm";

import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useAdminFetchData from "hooks/use-admin-fetch-data";

import { Village } from "types/schema";

const Videos: NextPage = () => {
  const router = useRouter();
  const { me, fetchMeData } = useFetchData();
  const { videos, fetchVideosData } = useAdminFetchData();

  useEffect(() => {
    const access_token = getUserToken();
    if (access_token) {
      fetchMeData();
    } else {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    if(!me?.roles?.includes("ADMIN")){
      router.push("/feed");
    }
  }, [me]);

  const [village, setVillage] = useState<Village>(null);

  useEffect(()=>{
    if(village){
      fetchVideosData({villageUuid: village.uuid})
    }
    else{
      fetchVideosData(null);
    }
  }, [village])

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },      
      {
        Header: 'Video',
        accessor: 'url',
        Cell: function VideoItem({ row }) {
          return (
            <Box w={40}>
              <VideoBox videoUrl={row.original.url} />
            </Box>
          );
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
      },      
    ],
    []
  )

  const [data, setData] = useState([])
  const tableInstance = useTable({ columns, data })
  useEffect(() => {
    setData(videos);
  }, [videos])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Layout>

        <VillageSearchBox setVillage={setVillage} />
        <Flex justifyContent={"flex-end"}>
          <Button onClick={() => onOpen()} isDisabled={!village}>Add Video</Button>
        </Flex>

        <Table {...getTableProps()}>
          <Thead>
            {
              headerGroups.map((headerGroup, index) => (
                <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map((column, iindex) => (
                      <Th key={iindex} {...column.getHeaderProps()}>
                        {
                          column.render('Header')}
                      </Th>
                    ))}
                </Tr>
              ))}
          </Thead>
          
          <Tbody {...getTableBodyProps()}>
            {
              rows.map((row, index) => {
                prepareRow(row)
                return (
                  <Tr key={index} {...row.getRowProps()}>
                    {
                      row.cells.map((cell, iindex) => {
                        return (
                          <Td key={iindex} {...cell.getCellProps()}>
                            {
                              cell.render('Cell')}
                          </Td>
                        )
                      })}
                  </Tr>
                )
              })}
          </Tbody>
        </Table>
      </Layout>

      <Modal
        closeOnOverlayClick={true}
        isCentered
        size={breakpointValue === "base" ? "full" : "2xl"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent m={0} p={6} bgColor="white">
          <VideoForm type="add" village={village} />
        </ModalContent>
      </Modal>

    </Fragment>
  );
};

export default Videos;
