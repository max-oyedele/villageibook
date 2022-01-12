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
  useDisclosure,
  useToast
} from "@chakra-ui/react";

import {
  FaWallet,
  FaGlobe,
  FaFile,
  FaShoppingCart,
  FaRegArrowAltCircleRight,
  FaRocket,
  FaThList,
} from "react-icons/fa";
import { useTable, useSortBy } from "react-table";

import Layout from "admin/components/Layout";
import ImageBox from "components/widgets/ImageBox";
import VideoBox from "components/widgets/VideoBox";
import VillageSearchBox from "admin/components/VillageSearchBox";
import UserForm from "admin/components/UserForm";
import DeleteDialog from "admin/components/DeleteDialog";

import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import useAdminActionDispatch from "hooks/use-admin-action-dispatch";

import { Village, User } from "types/schema";

const Personalities: NextPage = () => {
  const router = useRouter();
  const { me } = useFetchData();
  const { fetchMeData, submitStepTwoData } = useActionDispatch();
  const { pmusers } = useAdminFetchData();
  const { delStatus, deleteData, resetState, fetchPmusersData } = useAdminActionDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const access_token = getUserToken();
    if (access_token) {
      fetchMeData();
      console.log("ddddddddddddddddddddddddd")
      fetchPmusersData();
    } else {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    if (!me?.roles?.includes("ADMIN")) {
      // router.push("/feed");
    }
  }, [me]);

  useEffect(() => {
    if (delStatus && delStatus == "ok") {
      !toast.isActive("userDelete") &&
        toast({
          id: "userDelete",
          title: "Data has been deleted.",
          description: "Personalities data is deleleted",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      fetchPmusersData();
      resetState();
    }
  }, [delStatus]);

  // useEffect(() => {
  //   if (addUser) {
  //     !toast.isActive("userAdd") &&
  //       toast({
  //         id: "userAdd",
  //         title: "Data has been added.",
  //         description: "Personalities data is added",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //     });
  //     modal.onClose()
  //     if (village) {
  //       fetchPersonalitiesData({ villageUuid: village.uuid })
  //     }
  //     else {
  //       fetchPersonalitiesData(null);
  //     }
  //     resetState();
  //   }
  // }, [addUser]);

  // useEffect(() => {
  //   if (editUser) {
  //     !toast.isActive("userEdit") &&
  //       toast({
  //         id: "userEdit",
  //         title: "Data has been updated.",
  //         description: "Personalities data is updated.",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //     });
  //     modal.onClose()
  //     if (village) {
  //       fetchPersonalitiesData({ villageUuid: village.uuid })
  //     }
  //     else {
  //       fetchPersonalitiesData(null);
  //     }
  //     resetState();
  //   }
  // }, [addUser]);

  const [village, setVillage] = useState<Village>(null);

  useEffect(() => {
    fetchPmusersData();
  }, [village]);

  const columns = useMemo(
    () => [
      {
        Header: 'User',
        accessor: 'user',
        Cell: function UserItem({ row }) {
          console.log("row = ", row)
          return (
            <VStack>
              <Avatar src={row.original.avatar} size="sm" />
              <Text>{row.original.lastName} {row.original.firstName}</Text>
            </VStack>
          )
        }
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "About",
        accessor: "about",
      },
      {
        Header: "Photo1",
        accessor: "photo1",
        Cell: function PictureItem({ row }) {
          return (
            <Box w={20}>
              <ImageBox
                imageUrl={row.original.photo1}
              />
            </Box>
            
          );
        },
      },
      {
        Header: "Photo2",
        accessor: "photo2",
        Cell: function PictureItem({ row }) {
          return (
            <Box w={20}>
              <ImageBox
                imageUrl={row.original.photo2}
              />
            </Box>
          );
        },
      },
      {
        Header: "Photo3",
        accessor: "photo3",
        Cell: function PictureItem({ row }) {
          return (
            <Box w={20}>
              <ImageBox
                imageUrl={row.original.photo3}
              />
            </Box>
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: function ActionItem({ row }) {
          return (
            <HStack>
              <Button
                onClick={() => {
                  setUser(row.original);
                  modal.onOpen();
                  setIsEdit(true);
                }}
              >
                Edit
              </Button>
              <Button
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
    console.log("pmusers = ", pmusers)
    setData(pmusers);
  }, [pmusers]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const modal = useDisclosure();
  const dialog = useDisclosure();

  const [uuid, setUuid] = useState(null);
  const [user, setUser] = useState<User>(null);
  const onDelete = (uuid) => {
    deleteData({ type: "users", uuid });
    dialog.onClose();
  };

  return (
    <Fragment>
      <Layout>
        <VillageSearchBox setVillage={setVillage} />
        <Flex justifyContent={"flex-end"}>
          <Button onClick={() => { modal.onOpen(); setIsEdit(false); }} isDisabled={!village}>
            Add User
          </Button>
        </Flex>

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
          <UserForm
            type="add"
            user={user}
            isEdit={isEdit}
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

export default Personalities;
