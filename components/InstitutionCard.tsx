import { Fragment } from "react";
import { useRouter } from "next/router";
import {
  HStack,
  VStack,
  Divider,
  SimpleGrid,
  GridItem,
  Flex,
  Box,
  Image,
  Text,
  Link,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import type { Institution } from "types/schema";

const InstitutionCard: React.FC<{ institution: Institution }> = ({
  institution,
}) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <SimpleGrid
        w="full"
        minH="170px"
        columns={{ base: 5, md: 6 }}
        gap={2}
        p={2}
        border="1px"
        borderColor="gray.300"
        borderRadius="5px"
      >
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Image src={institution?.photo?.url??"/images/default-photo.jpg"} w="full" h="full" fit="cover" alt="" borderRadius="4px" />
        </GridItem>
        <GridItem
          colSpan={{ base: 3, md: 4 }}
          p={{ base: 0, md: 2 }}
        >
          <Flex
            h="full"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Text
              fontSize="12px"
              fontWeight="400"
              color="GrayText"
              textTransform="capitalize"
            >
              Established in {institution.yearEstablished}
            </Text>
            <Text
              fontSize="18px"
              color="primary"
              textTransform="capitalize"
            >
              {institution.name}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="GrayText">
              {institution.address}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="primary">
              {institution.phone}
            </Text>
            {breakpointValue === "base" && (
              <Link href={`/institutionview/${institution?.uuid}`} passHref={true}>
                <Box mt={4}>
                  <Button
                    w={{ base: "full", sm: "70%" }}
                    h="26px"
                    fontSize="12px"
                    fontWeight="400"
                  >
                    View More
                  </Button>
                </Box>
              </Link>
            )}
          </Flex>
        </GridItem>
        {breakpointValue === "md" && (
          <GridItem colSpan={1}>
            <Flex w="full" h="full" justifyContent="center" alignItems="center">
              <Link href={`/institutionview/${institution?.uuid}`} passHref={true}>
                <Button
                  px={4}
                  h="26px"
                  fontSize="12px"
                  fontWeight="400"
                >
                  View More
                </Button>
              </Link>
            </Flex>
          </GridItem>
        )}
      </SimpleGrid>
    </Fragment>
  );
};

export default InstitutionCard;
