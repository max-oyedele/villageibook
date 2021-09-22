import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";

import { Flex, HStack, VStack, SimpleGrid, Center, Circle, Text, Image } from "@chakra-ui/react";

const HomeCategoryBar = () => {
  const data = [
    {
      id: 0,
      title: "posts",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-post.svg"
    },
    {
      id: 1,
      title: "graduates",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-graduate.svg"
    },
    {
      id: 2,
      title: "society",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-society.svg"
    },
    {
      id: 3,
      title: "institutions",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-institution.svg"
    },
  ]

  return (
    <Fragment>
      <SimpleGrid spacing={8} columns={{base: 1, sm: 2, lg: 4}}>
        {
          data.map((item)=>(
            <VStack key={item.id} spacing={4}>
              <Image src={item.icon} w="50px" h="50px" />
              <Text fontSize="18px" textTransform="uppercase" textAlign="center">{item.title}</Text>
              <Text fontSize="13px" color="GrayText" textAlign="center">{item.desc}</Text>
            </VStack>
          ))
        }
        </SimpleGrid>    
    </Fragment>
  );
};

export default HomeCategoryBar;
