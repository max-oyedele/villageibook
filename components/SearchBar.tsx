import { Fragment, useState, useEffect } from "react";
import {
  SimpleGrid,
  Flex,
  Box,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import SelectBox from "components/widgets/SelectBox";
import { District, SubDistrict, Village } from "types/schema";
import router from "next/router";

import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const SearchBar = (props) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { districts, subDistricts, villages } = useFetchData();
  const { fetchDistrictsData, fetchSubDistrictsData, fetchVillagesData } = useActionDispatch();

  const [selectedDistrict, setSelectedDistrict] = useState<District>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] =
    useState<SubDistrict>(null);
  const [selectedVillage, setSelectedVillage] = useState<Village>(null);

  useEffect(() => {
    fetchDistrictsData(null);
  }, []);
  useEffect(() => {
    setSelectedSubDistrict(null);
    fetchSubDistrictsData({ district: selectedDistrict });
  }, [selectedDistrict]);
  useEffect(() => {
    setSelectedVillage(null);
    fetchVillagesData({ subDistrict: selectedSubDistrict });
  }, [selectedSubDistrict]);

  return (
    <Fragment>
      <Flex justifyContent="center">
        <SimpleGrid w="full" columns={{ base: 1, md: 3 }} spacing={6}>
          <SelectBox
            id="district"
            placeholder="Select District"
            height="45px"
            borderColor="#c7cedd"
            options={districts}
            optionLabel={({ name }) => name}
            selectedOption={selectedDistrict}
            setSelectedOption={setSelectedDistrict}
          />
          <SelectBox
            id="subdistrict"
            placeholder="Select Upazila"
            height="45px"
            borderColor="#c7cedd"
            options={subDistricts}
            optionLabel={({ name }) => name}
            selectedOption={selectedSubDistrict}
            setSelectedOption={setSelectedSubDistrict}
          />
          <SelectBox
            id="village"
            placeholder="Select Village"
            height="45px"
            borderColor="#c7cedd"
            options={villages}
            optionLabel={({ name }) => name}
            selectedOption={selectedVillage}
            setSelectedOption={setSelectedVillage}
          />
        </SimpleGrid>
        {breakpointValue === "md" && (
          <Box>
            <Button
              w="165px"
              h="full"
              fontSize="14px"
              fontWeight="400"
              borderRadius="6px"
              ml={6}
              disabled={!selectedVillage}
              onClick={() => {
                router.push(`/village/${selectedVillage.uuid}`);
              }}
            >
              Find Village
            </Button>
          </Box>
        )}
      </Flex>

      {breakpointValue === "base" && (
        <Button
          w="full"
          h="45px"
          fontSize="14px"
          fontWeight="400"
          borderRadius="6px"
          mt={6}
          disabled={!selectedVillage}
          onClick={() => {
            router.push(`/village/${selectedVillage.uuid}`);
          }}
        >
          Find Village
        </Button>
      )}
    </Fragment>
  );
};

export default SearchBar;
