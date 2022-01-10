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
import InstitutionForm from "admin/components/InstitutionForm";

import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import useAdminActionDispatch from "hooks/use-admin-action-dispatch";

import { Village } from "types/schema";

const Institutions: NextPage = () => {
  const router = useRouter();
  const { me } = useFetchData();
  const { fetchMeData } = useActionDispatch();
  const { institutions } = useAdminFetchData();
  const { fetchInstitutionsData } = useAdminActionDispatch();

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
      fetchInstitutionsData({villageUuid: village.uuid})
    }
    else{
      fetchInstitutionsData(null);
    }
  }, [village])

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Photo',
        accessor: 'photo',
        Cell: function PictureItem({ row }) {
          return (
            <Box w={40}>
              <ImageBox imageUrl={row.original.photo?.url} />
            </Box>
          );
        },
      },
      {
        Header: 'Year of Established',
        accessor: 'yearEstablished'
      },
      {
        Header: 'Address',
        accessor: 'address'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Phone',
        accessor: 'phone'
      },
      {
        Header: 'History',
        accessor: 'history'
      },
    ],
    []
  )

  const [data, setData] = useState([])
  const tableInstance = useTable({ columns, data })
  
  useEffect(() => {
    setData(institutions);
  }, [institutions]);

  useEffect(()=>{
    if(village){
      // setData(institutions.filter(e=>e.href.includes(village.href)));
    }
  }, [village])

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
          <Button onClick={() => onOpen()} isDisabled={!village}>Add Institution</Button>
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
          <InstitutionForm type="add" village={village} />
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default Institutions;
