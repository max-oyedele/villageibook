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
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

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
          borderColor="rgba(207, 207, 220, 0.8);"
          borderBottomWidth="1px"
          borderTopWidth="0px"
          bgColor="white"
          mb={4}
        >
          {({ isExpanded }) => (
            <>
            <AccordionButton h={14} _focus={{ boxShadow: "none" }} _hover={{ color: "purpleTone" }} p={0}>
              <Box
                flex="1"
                textAlign="left"
                fontSize="24px"
                lineHeight="24px"
                fontWeight="600"
                textTransform="capitalize"
                letterSpacing="-0.01em"
                color={
                  faq.id === expandedFaq?.id ? "purpleTone" : "primary"
                }
              >
                {faq.title}
              </Box>
              {isExpanded ? (
                <AiOutlineMinusCircle fontSize='30px' />
              ) : (
                <AiOutlinePlusCircle fontSize='30px' />
              )}
              
            </AccordionButton>
            <AccordionPanel px={0} pb={4}>
              <Box w="full" py={2}
                fontSize="20px"
                lineHeight="28px"
                color="#8E8EA8"
                letter="-1%"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.
              </Box>
            </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FaqAccordion;