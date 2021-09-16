import { Fragment, useState, useEffect } from "react";
import {
  SimpleGrid,
  Flex,
  Box,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { fetchDistricts } from "rdx/slices/district";
import { fetchUpazilas } from "rdx/slices/upazila";
import { fetchVillages } from "rdx/slices/village";
import { OurStore } from "rdx/store";

import SelectBox from "components/widgets/SelectBox";
import { District, Upazila, Village } from "types/schema";

const SearchBar = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const dispatch = useDispatch();
  const { status: districtStatus, districts } = useSelector(
    (state: OurStore) => state.districtReducer
  );
  const { status: upazilaStatus, upazilas } = useSelector(
    (state: OurStore) => state.upazilaReducer
  );
  const { status: villageStatus, villages } = useSelector(
    (state: OurStore) => state.villageReducer
  );

  const [selectedDistrict, setSelectedDistrict] = useState<District>(null);
  const [selectedUpazila, setSelectedUpazila] = useState<Upazila>(null);
  const [selectedVillage, setSelectedVillage] = useState<Village>(null);
  
  useEffect(() => {
    dispatch(fetchDistricts());
  }, []);
  useEffect(()=>{
    setSelectedUpazila(null)
    dispatch(fetchUpazilas({district: selectedDistrict?.href}));
  }, [selectedDistrict])
  useEffect(()=>{
    setSelectedVillage(null)
    dispatch(fetchVillages({upazila: selectedUpazila?.href}));
  }, [selectedUpazila])

  return (
    <Fragment>
      <Flex justifyContent="center">
        <SimpleGrid w="full" columns={{ base: 1, md: 3 }} spacing={6}>
          <SelectBox
            id="district"
            placeholder="Select District"
            height="45px"
            options={districts}
            optionLabel={({ name }) => name}
            selectedOption={selectedDistrict}
            setSelectedOption={setSelectedDistrict}
          />
          <SelectBox
            id="upazila"
            placeholder="Select Upazila"
            height="45px"
            options={upazilas}
            optionLabel={({ name }) => name}
            selectedOption={selectedUpazila}
            setSelectedOption={setSelectedUpazila}
          />
          <SelectBox
            id="village"
            placeholder="Select Village"
            height="45px"
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
              bgColor="purpleTone"
              fontSize="13px"
              fontWeight="400"
              color="white"
              borderRadius="6px"
              ml={6}
            >
              GO
            </Button>
          </Box>
        )}
      </Flex>

      {breakpointValue === "base" && (
        <Button
          w="full"
          h="45px"
          bgColor="purpleTone"
          fontSize="13px"
          fontWeight="400"
          color="white"
          borderRadius="6px"
          mt={6}
        >
          GO
        </Button>
      )}
    </Fragment>
  );
};

export default SearchBar;
