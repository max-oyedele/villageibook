import { Fragment } from "react";
import Link from "next/link";
import { Flex, Box, Text, Image, Button } from "@chakra-ui/react";

import type {Article} from "types/data";

const ArticleCard:React.FC<{article: Article}> = ({article}) => {
  return (
    <Fragment>
      <Flex w="full" flexDirection="column" justifyContent="center">
        <Image
          src={article.img}
          w="full"
          fit="cover"
          alt=""
        />
        <Text fontSize="16px" mt={6}>{article.title}</Text>
        <Text fontSize="12px" color="GrayText" mt={4}>{article.desc}</Text>
      </Flex>
    </Fragment>
  );
};

export default ArticleCard;
