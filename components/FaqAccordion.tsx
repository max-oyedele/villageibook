import { useState } from "react";
import {
  Divider,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import { faqs } from "constants/faq";

const FaqAccordion = () => {
  const [expandedFaq, setExpandedFaq] = useState(faqs[0]);

  return (
    <Accordion
      allowToggle
      w="full"
      defaultIndex={0}
      onChange={(index) => {
        typeof index === "number"
          ? setExpandedFaq(faqs[index])
          : setExpandedFaq(faqs[index[0]]);
      }}
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          id={faq.id.toString()}
          border="none"
          bgColor="white"
          mb={4}
        >
          <AccordionButton h={14} _focus={{ boxShadow: "none" }} _hover={{ color: "purpleTone" }} p={0}>
            <Box
              flex="1"
              textAlign="left"
              fontSize="16px"
              textTransform="capitalize"
              color={
                faq.id === expandedFaq?.id ? "purpleTone" : "primary"
              }
            >
              {faq.title}
            </Box>

            <AccordionIcon ml={4} />
          </AccordionButton>
          <AccordionPanel px={0} pb={4}>
            <Box w="full" py={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.
            </Box>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FaqAccordion;