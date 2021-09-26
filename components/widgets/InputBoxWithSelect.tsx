import {Fragment} from "react";
import {Box, HStack, FormControl, FormLabel, FormErrorMessage, Input} from "@chakra-ui/react";

import SelectBox from "components/widgets/SelectBox";

const InputBoxWithSelect: React.FC<{
  id: string;
  label: string;
  options: any[];
  optionLabel: any;
  selectedOption: any;
  setSelectedOption: React.Dispatch<React.SetStateAction<any | null>>;
  isRequired: boolean;
  isInvalid: boolean;
  error: any;
}> = ({
  id,
  label,
  options,
  optionLabel,
  selectedOption,
  setSelectedOption,
  isRequired,
  isInvalid,
  error,
}) => {
  return (
    <Fragment>
      <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
        <HStack mt={4}>
          <FormLabel w="40%" fontSize="13px" color="GrayText">
            {label}
          </FormLabel>
          <Box w="full">
            <SelectBox
              id={id}
              options={options}
              optionLabel={optionLabel}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              width="full"
              height="40px"
            />
          </Box>
        </HStack>
        <HStack spacing={5}>
          <Box w="40%"></Box>
          <Box w="full">
            <FormErrorMessage>{error}</FormErrorMessage>
          </Box>
        </HStack>
      </FormControl>
    </Fragment>
  );
};

export default InputBoxWithSelect;