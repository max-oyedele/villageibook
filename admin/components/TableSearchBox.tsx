import React, { Fragment, useState, useEffect } from "react";
import {
  HStack,
  Box,
  Input,
} from "@chakra-ui/react";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import { Village } from "types/schema";

const VillageSearchBox: React.FC<{ onChange }> = ({ onChange }) => {
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
        <Box ml={6}>
          <Input
            placeholder="Search..."
            size="md"
            width="full"
            height="40px"
            // border="none"
            value={searchText ?? ""}
            // _focus={{ outline: "none" }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* <SelectBox
            id="search"
            options={villages}
            optionLabel={({ name }) => name}
            selectedOption={selectedVillage}
            setSelectedOption={setSelectedVillage}
            width="full"
            height="40px"
            placeholder="Search..."
          /> */}
        </Box>
      </HStack>
    </Fragment>
  );
};

export default VillageSearchBox;
