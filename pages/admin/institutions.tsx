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
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { FaWallet, FaGlobe, FaFile, FaShoppingCart, FaRegArrowAltCircleRight, FaRocket, FaThList } from "react-icons/fa";
import { useTable, useSortBy } from 'react-table';

import Layout from "admin/components/Layout";
import ImageBox from "components/widgets/ImageBox";
import VideoBox from "components/widgets/VideoBox";

import { getUserToken } from "helpers/user-token";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const Institutions: NextPage = () => {
  const router = useRouter();
  const { me, institutions, fetchCommonData, fetchMeData, fetchInstitutionsData } = useAdminFetchData();

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
    fetchInstitutionsData();
  }, [me]);

  const columns = useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Picture',
        accessor: 'picture',
        Cell: function PictureItem({ row }) {
          return (
            <Box w={40}>
              <ImageBox
                imageUrl={row.original.picture}
              />
            </Box>
          );
        },
      },
    ],
    []
  )

  const [data, setData] = useState([])
  const tableInstance = useTable({ columns, data })
  useEffect(() => {
    setData(institutions.map(institution => (
      {
        category: institution.category,
        name: institution.name,
        // picture: institution.picture,
      }
    )))
  }, [institutions])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <Fragment>
      <Layout>
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
    </Fragment>
  );
};

export default Institutions;
