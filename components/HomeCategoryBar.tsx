import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";

import { Flex, HStack, VStack, SimpleGrid, Center, Circle, Text, Image } from "@chakra-ui/react";

const HomeCategoryBar = () => {
  const data = [
    {
      id: 0,
      title: "posts",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-mypage.svg"
    },
    {
      id: 1,
      title: "graduates",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-graduate.svg"
    },
    {
      id: 2,
      title: "stories",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-story.svg"
    },
    {
      id: 3,
      title: "institutions",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-institution.svg"
    },
    {
      id: 4,
      title: "personalities",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-personality.svg"
    },
    {
      id: 5,
      title: "videos",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-video.svg"
    },
  ]

  return (
    <Fragment>
      <SimpleGrid spacing={8} columns={{ base: 2, md: 3 }} gap={{ base: 12, md: 24 }}>
        {
          data.map((item) => (
            <VStack key={item.id} spacing={4}>
              <Image src={item.icon} boxSize="50px" alt="" />
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
