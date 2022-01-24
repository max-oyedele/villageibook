import React, { Fragment, useState, useEffect } from "react";
import {
  Flex,
  HStack,
  VStack,
  StackDivider,
  Box,
  Text,
  Image,
  Progress,
  Input,
  Button,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

import InputBoxWithSelect from "components/widgets/InputBoxWithSelect";
import SelectBox from "components/widgets/SelectBox";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import { Village } from "types/schema";

const VillageSearchBox: React.FC<{ setVillage }> = ({ setVillage }) => {
  const { villages } = useFetchData();
  const { fetchVillagesData } = useActionDispatch();
  const [selectedVillage, setSelectedVillage] = useState<Village>(null);

  useEffect(()=>{
    if(villages.length == 0){
      fetchVillagesData({});
    }
  }, []);

  useEffect(() => {
    if (selectedVillage) {
      setVillage(selectedVillage);
    }
  }, [selectedVillage])

  const handleChange = (value) => {
    if (!value) {
      setVillage(null);
    }
  }

  return (
    <Fragment>
      <HStack>
        {/* <BiSearch fontSize={20} color="#553CFB" /> */}
        <Box w={72} ml={6}>
          <SelectBox
            id="villageSelector"
            options={villages}
            optionLabel={({ name }) => name}
            selectedOption={selectedVillage}
            setSelectedOption={setSelectedVillage}
            isClearable={true}
            onChange={handleChange}
            width="full"
            height="40px"
            placeholder="Select Village"
          />
        </Box>
      </HStack>
    </Fragment>
  );
};

export default VillageSearchBox;
