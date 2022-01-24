import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  HStack,
  Avatar,
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
  useToast,
  ModalBody
} from "@chakra-ui/react";

import { useTable, useSortBy } from "react-table";
import Layout from "admin/components/Layout";
import VillageSearchBox from "admin/components/VillageSearchBox";
import TableSearchBox from "admin/components/TableSearchBox";
import PersonalityForm from "admin/components/PersonalityForm";
import DeleteDialog from "admin/components/DeleteDialog";
import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import useAdminActionDispatch from "hooks/use-admin-action-dispatch";
import { Village, Personality } from "types/schema";
import ReadMoreLess from "components/widgets/ReadMoreLess";
import Paginate from "components/Paginate";

const Personalities: NextPage = () => {
  const router = useRouter();
  const { me } = useFetchData();
  const { fetchMeData } = useActionDispatch();
  const { personalities } = useAdminFetchData();
  const { delStatus, addPersonality, editPersonality, deleteData, resetState, fetchPersonalitiesData } = useAdminActionDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const toast = useToast();
  const [pageData, setPageData] = useState([]);
  const itemsPerPage = 5;
  type ScrollBehavior = "inside";

  useEffect(() => {
    const access_token = getUserToken();
    if (access_token) {
      fetchMeData();
    } else {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    if (!me?.roles?.includes("ADMIN")) {
      router.push("/feed");
    }
  }, [me]);

  useEffect(() => {
    if (delStatus && delStatus == "ok") {
      !toast.isActive("personalityDelete") &&
        toast({
          id: "personalityDelete",
          title: "Data has been deleted.",
          description: "Personalities data is deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      if (village) {
        fetchPersonalitiesData({ villageUuid: village.uuid })
      }
      else {
        fetchPersonalitiesData(null);
      }
      resetState();
    }
  }, [delStatus]);

  useEffect(() => {
    if (addPersonality) {
      !toast.isActive("personalityAdd") &&
        toast({
          id: "personalityAdd",
          title: "Data has been added.",
          description: "Personalities data is added",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      modal.onClose()
      if (village) {
        fetchPersonalitiesData({ villageUuid: village.uuid })
      }
      else {
        fetchPersonalitiesData(null);
      }
      resetState();
    }
  }, [addPersonality]);

  useEffect(() => {
    if (editPersonality) {
      !toast.isActive("personalityEdit") &&
        toast({
          id: "personalityEdit",
          title: "Data has been updated.",
          description: "Personalities data is updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      modal.onClose()
      if (village) {
        fetchPersonalitiesData({ villageUuid: village.uuid })
      }
      else {
        fetchPersonalitiesData(null);
      }
      resetState();
    }
  }, [addPersonality]);

  const [village, setVillage] = useState<Village>(null);

  useEffect(() => {
    if (village) {
      fetchPersonalitiesData({ villageUuid: village.uuid });
    } else {
      fetchPersonalitiesData(null);
    }
  }, [village]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Photo",
        accessor: "photo.url",
        Cell: function PictureItem({ row }) {
          return (
            <Box>
              <Avatar src={row.original.photo?.url} size="md" />
            </Box>
          );
        },
      },
      {
        Header: "About",
        accessor: "about",
        Cell: function AboutItem({ row }) {
          return (
            <Box>
              <ReadMoreLess>{row.original.about}</ReadMoreLess>  
            </Box>
          );
        },
      },
      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
      },
      {
        Header: "Date of Death",
        accessor: "dateOfDeath",
      },
      {
        Header: "Education Life",
        accessor: "educationLife",
      },
      {
        Header: "Achievements",
        accessor: "achievements",
      },
      {
        Header: "Career",
        accessor: "career",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: function ActionItem({ row }) {
          return (
            <HStack>
              { village && (
                <Button
                  onClick={() => {
                    setPersonality(row.original);
                    modal.onOpen();
                    setIsEdit(true);
                  }}
                >
                  Edit
                </Button>
              )}
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
          );
        },
      },
    ],
    [village]
  )

  const [data, setData] = useState([]);
  const tableInstance = useTable({ columns, data });
  useEffect(() => {
    setData(pageData);
  }, [pageData])

  useEffect(() => {
    if (pageData && personalities?.length <= itemsPerPage)
      setPageData(personalities.slice(0, itemsPerPage));
  }, [personalities]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const modal = useDisclosure();
  const dialog = useDisclosure();

  const [uuid, setUuid] = useState(null);
  const [personality, setPersonality] = useState<Personality>(null);
  const onDelete = (uuid) => {
    deleteData({ type: "personalities", uuid });
    dialog.onClose();
  };
  const [scrollBehavior, setScrollBehavior] = useState<ScrollBehavior>("inside");
  const [searchText, setSearhText] = useState('');

  const onSubmit = (value) => {
    modal.onClose();
    if (value == "add") {
      !toast.isActive("personalityAdd") &&
        toast({
          id: "personalityAdd",
          title: "Data has been inserted.",
          description: "Personality data is inserted.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
    } 
    else if (value == "update") {
      !toast.isActive("personalityUpdate") &&
        toast({
          id: "personalityUpdate",
          title: "Data has been Updated.",
          description: "Personality data is updated.",
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
      fetchPersonalitiesData({ villageUuid: village.uuid })
    }
    else {
      fetchPersonalitiesData(null);
    }
  };
  
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
            <Button onClick={() => { modal.onOpen(); setIsEdit(false); }} isDisabled={!village}>
              Add Personality
            </Button>
          </Flex>
        </Box>
        <Box overflowX="auto">
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, iindex) => (
                    <Th key={iindex} {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <Tr key={index} {...row.getRowProps()}>
                    {row.cells.map((cell, iindex) => {
                      return (
                        <Td key={iindex} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
        <Paginate
          data={personalities}
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
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent m={0} p={6} bgColor="white">
          <ModalBody>
            <PersonalityForm
              type="add"
              village={village}
              personality={isEdit ? personality : null}
              isEdit={isEdit}
              onSubmit={onSubmit}
            />
          </ModalBody>
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

export default Personalities;
