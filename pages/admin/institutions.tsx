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

import { useTable } from 'react-table';
import Layout from "admin/components/Layout";
import ImageBox from "components/widgets/ImageBox";
import VillageSearchBox from "admin/components/VillageSearchBox";
import TableSearchBox from "admin/components/TableSearchBox";
import InstitutionForm from "admin/components/InstitutionForm";
import DeleteDialog from "admin/components/DeleteDialog";
import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import useAdminActionDispatch from "hooks/use-admin-action-dispatch";
import { Institution, Village } from "types/schema";
import Paginate from "components/Paginate";

const Institutions: NextPage = () => {
  const router = useRouter();
  const { me } = useFetchData();
  const { fetchMeData } = useActionDispatch();
  const { institutions } = useAdminFetchData();
  const { delStatus, addInstitution, editInstitution, deleteData, resetState, fetchInstitutionsData } = useAdminActionDispatch();
  const [isEdit, setIsEdit] = useState(false);
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
  }, [me]);

  useEffect(() => {
    if (delStatus && delStatus == "ok") {
      !toast.isActive("institutionsDelete") &&
        toast({
          id: "institutionsDelete",
          title: "Data has been deleted.",
          description: "Institutions data is deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      resetState();
      if (village) {
        fetchInstitutionsData({ villageUuid: village.uuid })
      }
      else {
        fetchInstitutionsData(null);
      }
    }
  }, [delStatus]);

  useEffect(() => {
    if (addInstitution) {
      !toast.isActive("InstitutionAdd") &&
        toast({
          id: "InstitutionAdd",
          title: "Data has been added.",
          description: "Institutions data is added",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      modal.onClose()
      if (village) {
        fetchInstitutionsData({ villageUuid: village.uuid })
      }
      else {
        fetchInstitutionsData(null);
      }
      resetState();
    }
  }, [addInstitution]);

  useEffect(() => {
    if (editInstitution) {
      !toast.isActive("InstitutionEdit") &&
        toast({
          id: "InstitutionEdit",
          title: "Data has been updated.",
          description: "Institutions data is updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      modal.onClose()
      if (village) {
        fetchInstitutionsData({ villageUuid: village.uuid })
      }
      else {
        fetchInstitutionsData(null);
      }
      resetState();
    }
  }, [editInstitution]);

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
            <Box w={36} h={36}>
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
                    setInstitution(row.original);
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
  
  useEffect(() => {
    setData(pageData);
  }, [pageData])

  useEffect(() => {
    if (pageData && institutions?.length <= itemsPerPage)
      setPageData(institutions.slice(0, itemsPerPage));
  }, [institutions]);

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
  const [institution, setInstitution] = useState<Institution>(null);
  const [searchText, setSearhText] = useState('');
  const onDelete = (uuid) => {
    deleteData({ type: "institutions", uuid });
    dialog.onClose();
  }

  const onSubmit = (value) => {
    modal.onClose();
    if (value == "add") {
      !toast.isActive("InstitutionAdd") &&
        toast({
          id: "InstitutionAdd",
          title: "Data has been inserted.",
          description: "Institution data is inserted.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
    } 
    else if (value == "update") {
      !toast.isActive("InstitutionUpdate") &&
        toast({
          id: "InstitutionUpdate",
          title: "Data has been Updated.",
          description: "Institution data is updated.",
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
      fetchInstitutionsData({ villageUuid: village.uuid })
    }
    else {
      fetchInstitutionsData(null);
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
            <Button onClick={() => {
              modal.onOpen();
              setIsEdit(false);
              }} isDisabled={!village}>Add Institution</Button>
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
          data={institutions}
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
          <InstitutionForm
            type="add"
            village={village}
            institution={isEdit ? institution : null}
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

export default Institutions;
