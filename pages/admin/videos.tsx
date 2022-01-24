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
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
  useDisclosure,
  HStack,
  useToast
} from "@chakra-ui/react";

import { useTable } from 'react-table';

import Layout from "admin/components/Layout";
import VideoBox from "components/widgets/VideoBox";
import VillageSearchBox from "admin/components/VillageSearchBox";
import TableSearchBox from "admin/components/TableSearchBox";
import VideoForm from "admin/components/VideoForm";
import DeleteDialog from "admin/components/DeleteDialog";
import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import useAdminActionDispatch from "hooks/use-admin-action-dispatch";
import { Village, Video } from "types/schema";
import ReadMoreLess from "components/widgets/ReadMoreLess";
import Paginate from "components/Paginate";

const Videos: NextPage = () => {
  const router = useRouter();
  const { me } = useFetchData();
  const { fetchMeData } = useActionDispatch();
  const { videos } = useAdminFetchData();
  const { delStatus, deleteData, resetState, fetchVideosData } = useAdminActionDispatch();
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
      !toast.isActive("VideoDelete") &&
        toast({
          id: "VideoDelete",
          title: "Data has been deleted.",
          description: "Videos data is deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      resetState();
      if (village) {
        fetchVideosData({ villageUuid: village.uuid })
      }
      else {
        fetchVideosData(null);
      }
    }
  }, [delStatus]);

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
            <Box w={60}>
              <VideoBox videoUrl={row.original.url} />
            </Box>
          );
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: function DescriptionItem({ row }) {
          return (
            <Box>
              <ReadMoreLess>{row.original.description}</ReadMoreLess>  
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
                    setVideo(row.original);
                    modal.onOpen();
                    setIsEdit(true);
                  }}
                >
                  Edit
                </Button>
              }
              <Button
                variant='gray'
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
  const [video, setVideo] = useState<Video>(null);
  const onDelete = (uuid) => {
    deleteData({ type: "videos", uuid });
    dialog.onClose();
  }
  const [pageData, setPageData] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    setData(pageData);
  }, [pageData])

  useEffect(() => {
    if (pageData && videos?.length <= itemsPerPage)
      setPageData(videos.slice(0, itemsPerPage));
  }, [videos]);

  const onSubmit = (value) => {
    modal.onClose();
    if (value == "add") {
      !toast.isActive("VideoAdd") &&
        toast({
          id: "VideoAdd",
          title: "Data has been added.",
          description: "Video data is added.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
    } 
    else if (value == "update") {
      !toast.isActive("VideoUpdate") &&
        toast({
          id: "VideoUpdate",
          title: "Data has been Updated.",
          description: "Video data is updated.",
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
      fetchVideosData({ villageUuid: village.uuid })
    }
    else {
      fetchVideosData(null);
    }
  };
  const [searchText, setSearhText] = useState('');
  
  return (
    <Fragment>
      <Layout>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Flex justifyContent={"flex-start"}>
            <VillageSearchBox setVillage={setVillage} />
            <TableSearchBox
              onChange={setSearhText}
            />
          </Flex>
          <Flex justifyContent={"flex-end"}>
            <Button onClick={() => {
              modal.onOpen();
              setIsEdit(false);
              }} isDisabled={!village}>Add Video</Button>
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
        </Box>
        <Paginate
          data={videos}
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
          <VideoForm
            type="add"
            village={village}
            video={isEdit ? video : null}
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

export default Videos;
