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

import { useTable, useSortBy } from 'react-table';

import Layout from "admin/components/Layout";
import ImageBox from "components/widgets/ImageBox";
import VideoBox from "components/widgets/VideoBox";
import VillageSearchBox from "admin/components/VillageSearchBox";
import StoryForm from "admin/components/StoryForm";
import DeleteDialog from "admin/components/DeleteDialog";

import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import useAdminActionDispatch from "hooks/use-admin-action-dispatch";

import { Village, Story } from "types/schema";

const Stories: NextPage = () => {
  const router = useRouter();
  const { me } = useFetchData();
  const { fetchMeData } = useActionDispatch();
  const { stories } = useAdminFetchData();
  const { fetchStoriesData, deleteData } = useAdminActionDispatch();

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

  useEffect(() => {
    if (village) {
      fetchStoriesData({ villageUuid: village.uuid })
    }
    else {
      fetchStoriesData(null);
    }
  }, [village])

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Content',
        accessor: 'content',
      },
      {
        Header: 'Photo',
        accessor: 'photo.url',
        Cell: function PictureItem({ row }) {
          return (
            <Box w={40}>
              <ImageBox imageUrl={row.original.photo?.url} />
            </Box>
          );
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: function ActionItem({ row }) {
          return (
            <HStack>
              {
                !!village &&
                <Button onClick={() => { setStory(row.original); modal.onOpen() }}>Edit</Button>
              }
              <Button onClick={() => { setUuid(row.original.uuid); dialog.onOpen() }}>Delete</Button>
            </HStack>
          )
        }
      }
    ],
    []
  )

  const [data, setData] = useState([])
  const tableInstance = useTable({ columns, data })
  useEffect(() => {
    setData(stories);
  }, [stories])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const modal = useDisclosure();
  const dialog = useDisclosure();

  const [uuid, setUuid] = useState(null);
  const [story, setStory] = useState<Story>(null);
  const onDelete = (uuid) => {
    deleteData({ type: "stories", uuid });
    dialog.onClose();
  }

  return (
    <Fragment>
      <Layout>

        <VillageSearchBox setVillage={setVillage} />
        <Flex justifyContent={"flex-end"}>
          <Button onClick={() => modal.onOpen()} isDisabled={!village}>Add Story</Button>
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
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <ModalOverlay />
        <ModalContent m={0} p={6} bgColor="white">
          <StoryForm type="add" village={village} story={story} />
        </ModalContent>
      </Modal>

      <DeleteDialog uuid={uuid} isOpen={dialog.isOpen} onClose={dialog.onClose} onConfirm={onDelete} />

    </Fragment>
  );
};

export default Stories;
