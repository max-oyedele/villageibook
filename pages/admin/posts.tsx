import { Fragment, useState, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  HStack,
  VStack,
  Avatar,
  Text,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

import { useTable, useSortBy } from 'react-table';
import Layout from "admin/components/Layout";
import ImageBox from "components/widgets/ImageBox";
import VideoBox from "components/widgets/VideoBox";
import DeleteDialog from "admin/components/DeleteDialog";
import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import useAdminActionDispatch from "hooks/use-admin-action-dispatch";
import ReadMoreLess from "components/widgets/ReadMoreLess";
import Paginate from "components/Paginate";
import TableSearchBox from "admin/components/TableSearchBox";

const Posts: NextPage = () => {
  const router = useRouter();
  const { me } = useFetchData();
  const { fetchMeData } = useActionDispatch();
  const { posts } = useAdminFetchData();
  const { delStatus, resetState, fetchPostsData, deleteData } = useAdminActionDispatch();
  const toast = useToast();
  const [pageData, setPageData] = useState([]);
  const itemsPerPage = 4;

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
    fetchPostsData();
  }, [me]);

  useEffect(() => {
    if (delStatus && delStatus == "ok") {
      !toast.isActive("PostDelete") &&
        toast({
          id: "PostDelete",
          title: "Data has been deleted.",
          description: "Post data is deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      resetState();
      fetchPostsData();
    }
  }, [delStatus]);

  const columns = useMemo(
    () => [
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
        Header: 'Picture',
        accessor: 'picture',
        Cell: function PictureItem({ row }) {
          return (
            <Box w={36} h={36}>
              <ImageBox
                imageUrl={row.original.picture}
              />
            </Box>
          );
        },
      },
      {
        Header: 'Video',
        accessor: 'video',
        Cell: function VideoItem({ row }) {
          return (
            <Box w={40}>
              <VideoBox videoUrl={row.original.video} />
            </Box>
          )
        }
      },
      {
        Header: 'User',
        accessor: 'user',
        Cell: function UserItem({ row }) {
          return (
            <VStack>
              <Avatar src={row.original.user.avatar} size="sm" />
              <Text>{row.original.user.firstName} {row.original.user.lastName}</Text>
            </VStack>
          )
        }
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: function ActionItem({ row }) {
          return (
            <HStack>
              <Button onClick={() => { setUuid(row.original.uuid); onOpen() }}>Delete</Button>
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
    setData(pageData?.map(post => (
      {
        uuid: post.uuid,
        content: post.content,
        picture: post.picture,
        video: post.video,
        user: post.user
      }
    )))
  }, [pageData])

  useEffect(() => {
    if (pageData && posts?.length <= itemsPerPage)
      setPageData(posts.slice(0, itemsPerPage));
  }, [posts]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uuid, setUuid] = useState(null);
  const onDelete = (uuid) => {    
    deleteData({ type: "posts", uuid });
    onClose();
  }
  const [searchText, setSearhText] = useState('');

  return (
    <Fragment>
      <Layout>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Flex justifyContent={"flex-start"}>
            <TableSearchBox
              onChange={setSearhText}
            />
          </Flex>
        </Box>
        <Box overflowX="auto">
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
                            <Td key={iindex} {...cell.getCellProps()} p={3}>
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
        </Box>
        <Paginate
          data={posts}
          pageData={setPageData}
          itemsPerPage={itemsPerPage}
          centerPagination={true}
          searchText={searchText}
        />
      </Layout>
      <DeleteDialog uuid={uuid} isOpen={isOpen} onClose={onClose} onConfirm={onDelete} />
    </Fragment>
  );
};

export default Posts;
