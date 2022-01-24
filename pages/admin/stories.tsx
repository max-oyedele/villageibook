import { Fragment, useState, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

import { useTable, useSortBy } from 'react-table';
import Layout from "admin/components/Layout";
import ImageBox from "components/widgets/ImageBox";
import VillageSearchBox from "admin/components/VillageSearchBox";
import TableSearchBox from "admin/components/TableSearchBox";
import StoryForm from "admin/components/StoryForm";
import DeleteDialog from "admin/components/DeleteDialog";
import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import useAdminActionDispatch from "hooks/use-admin-action-dispatch";
import { Village, Story } from "types/schema";
import ReadMoreLess from "components/widgets/ReadMoreLess";
import Paginate from "components/Paginate";

const Stories: NextPage = () => {
  const router = useRouter();
  const { me } = useFetchData();
  const { fetchMeData } = useActionDispatch();
  const { stories } = useAdminFetchData();
  const { delStatus, addStory, editStory, deleteData, resetState, fetchStoriesData } = useAdminActionDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const toast = useToast();

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

  useEffect(() => {
    if (delStatus && delStatus == "ok") {
      !toast.isActive("StoryDelete") &&
        toast({
          id: "StoryDelete",
          title: "Data has been deleted.",
          description: "Stories data is deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      resetState();
      if (village) {
        fetchStoriesData({ villageUuid: village.uuid })
      }
      else {
        fetchStoriesData(null);
      }
    }
  }, [delStatus]);

  useEffect(() => {
    if (addStory) {
      !toast.isActive("StoryAdd") &&
        toast({
          id: "StoryAdd",
          title: "Data has been added.",
          description: "Stories data is added",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      modal.onClose()
      if (village) {
        fetchStoriesData({ villageUuid: village.uuid })
      }
      else {
        fetchStoriesData(null);
      }
      resetState();
    }
  }, [addStory]);

  useEffect(() => {
    if (editStory) {
      !toast.isActive("StoryEdit") &&
        toast({
          id: "StoryEdit",
          title: "Data has been updated.",
          description: "Stories data is updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      modal.onClose()
      if (village) {
        fetchStoriesData({ villageUuid: village.uuid })
      }
      else {
        fetchStoriesData(null);
      }
      resetState();
    }
  }, [editStory]);

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
        Cell: function ContentItem({ row }) {
          return (
            <Box>
              <ReadMoreLess>{row.original.content}</ReadMoreLess>  
            </Box>
          );
        },
      },
      {
        Header: 'Photo',
        accessor: 'photo.url',
        Cell: function PictureItem({ row }) {
          return (
            <Box w={36} h={36}>
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
                village &&
                <Button
                  onClick={() => {
                    setStory(row.original);
                    modal.onOpen();
                    setIsEdit(true);
                  }}
                >
                  Edit
                </Button>
              }
              <Button
                onClick={() => {
                  setUuid(row.original.uuid);
                  dialog.onOpen();
                }}
              >
                Delete
              </Button>
            </HStack>
          )
        }
      }
    ],
    [village]
  )

  const [data, setData] = useState([])
  const tableInstance = useTable({ columns, data })
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
  const [pageData, setPageData] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    setData(pageData);
  }, [pageData])

  useEffect(() => {
    if (pageData && stories?.length <= itemsPerPage)
      setPageData(stories.slice(0, itemsPerPage));
  }, [stories]);

  const onSubmit = (value) => {
    modal.onClose();
    if (value == "add") {
      !toast.isActive("StoryAdd") &&
        toast({
          id: "StoryAdd",
          title: "Data has been inserted.",
          description: "Story data is inserted.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
    } 
    else if (value == "update") {
      !toast.isActive("StoryUpdate") &&
        toast({
          id: "StoryUpdate",
          title: "Data has been Updated.",
          description: "Story data is updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
    } else {
      !toast.isActive("userError") &&
        toast({
          id: "userError",
          title: "Failed! Try again.",
          description: "Error",
          status: "error",
          duration: 3000,
          isClosable: true,
      });
    }
    if (village) {
      fetchStoriesData({ villageUuid: village.uuid })
    }
    else {
      fetchStoriesData(null);
    }
  };
  const [searchText, setSearhText] = useState('');
  
  return (
    <Fragment>
      <Layout>
        <VillageSearchBox setVillage={setVillage} />
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Flex justifyContent={"flex-start"}>
            <TableSearchBox
              onChange={setSearhText}
            />
          </Flex>
          <Flex justifyContent={"flex-end"}>
            <Button onClick={() => {
              modal.onOpen();
              setIsEdit(false);
              }} isDisabled={!village}>Add Story</Button>
          </Flex>
        </Box>
        <Box overflowX="auto">
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
                            <Td key={iindex} {...cell.getCellProps()} p={2}>
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
        </Box>
        <Paginate
          data={stories}
          pageData={setPageData}
          itemsPerPage={itemsPerPage}
          centerPagination={true}
          searchText={searchText}
        />
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
          <StoryForm
            type="add"
            village={village}
            story={isEdit ? story : null}
            isEdit={isEdit}
            onSubmit={onSubmit}
          />
        </ModalContent>
      </Modal>

      <DeleteDialog
        uuid={uuid}
        isOpen={dialog.isOpen}
        onClose={dialog.onClose}
        onConfirm={onDelete}
      />

    </Fragment>
  );
};

export default Stories;
