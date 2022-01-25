import React, { Fragment, useState, useEffect } from "react";
import {
  HStack,
  Box,
  Input,
} from "@chakra-ui/react";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const TableSearchBox: React.FC<{ onChange }> = ({ onChange }) => {
  const { villages } = useFetchData();
  const { fetchVillagesData } = useActionDispatch();
  const [searchText, setSearchText] = useState("");

  useEffect(()=>{
    if(villages.length == 0){
      fetchVillagesData({});
    }
  }, []);

  useEffect(() => {
    onChange(searchText);
  }, [searchText])

  return (
    <Fragment>
      <HStack>
        <Box w={72} ml={6}>
          <Input
            placeholder="Search..."
            size="md"
            width="full"
            height="40px"
            background="white"
            value={searchText ?? ""}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Box>
      </HStack>
    </Fragment>
  );
};

export default TableSearchBox;
