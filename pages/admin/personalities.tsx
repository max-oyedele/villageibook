import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  VStack,
  Center,
  Icon,
  Image,
  Avatar,
  Text,
  Portal,
  Progress,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
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
  useColorModeValue,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";

import { FaWallet, FaGlobe, FaFile, FaShoppingCart, FaRegArrowAltCircleRight, FaRocket, FaThList } from "react-icons/fa";
import { useTable, useSortBy } from 'react-table';

import Layout from "admin/components/Layout";
import ImageBox from "components/widgets/ImageBox";
import VideoBox from "components/widgets/VideoBox";
import VillageSearchBox from "admin/components/VillageSearchBox";
import PersonalityForm from "admin/components/PersonalityForm";

import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useAdminFetchData from "hooks/use-admin-fetch-data";

import { Village } from "types/schema";

const Personalities: NextPage = () => {
  const router = useRouter();
  const { me, fetchMeData } = useFetchData();
  const { personalities, fetchPersonalitiesData } = useAdminFetchData();

  useEffect(() => {
    const access_token = getUserToken();
    if (access_token) {
      fetchMeData();
    } else {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    // if(me.role !== "admin"){
    //   router.push("/feed");
    // }

    fetchPersonalitiesData();
  }, [me]);

    const [village, setVillage] = useState<Village>(null);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Photo',
        accessor: 'photo.url',
        Cell: function PictureItem({ row }) {
          return (
            <Box w={40}>
              <Avatar src={row.original.photo?.url} size="md" />
            </Box>
          );
        },
      },
      {
        Header: 'About',
        accessor: 'about',
      },
      {
        Header: 'Date of Birth',
        accessor: 'dateOfBirth',
      },
      {
        Header: 'Date of Death',
        accessor: 'dateOfDeath',
      },
      {
        Header: 'Education Life',
        accessor: 'educationLife',
      },
      {
        Header: 'Achievements',
        accessor: 'achievements',
      },
      {
        Header: 'Career',
        accessor: 'career',
      },
    ],
    []
  )

  const [data, setData] = useState([])
  const tableInstance = useTable({ columns, data })
  useEffect(() => {
    setData(personalities);
  }, [personalities])

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
          <Button onClick={() => onOpen()} isDisabled={!village}>Add Personality</Button>
        </Flex>

        <Table {...getTableProps()}>
          <Thead>
            {// Loop over the header rows
              headerGroups.map((headerGroup, index) => (
                // Apply the header row props
                <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {// Loop over the headers in each row
                    headerGroup.headers.map((column, iindex) => (
                      // Apply the header cell props
                      <Th key={iindex} {...column.getHeaderProps()}>
                        {// Render the header
                          column.render('Header')}
                      </Th>
                    ))}
                </Tr>
              ))}
          </Thead>
          {/* Apply the table body props */}
          <Tbody {...getTableBodyProps()}>
            {// Loop over the table rows
              rows.map((row, index) => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <Tr key={index} {...row.getRowProps()}>
                    {// Loop over the rows cells
                      row.cells.map((cell, iindex) => {
                        // Apply the cell props
                        return (
                          <Td key={iindex} {...cell.getCellProps()}>
                            {// Render the cell contents
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
          <PersonalityForm type="add" village={village} />
        </ModalContent>
      </Modal>

    </Fragment>
  );
};

export default Personalities;
