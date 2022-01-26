import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";

import { Flex, HStack, VStack, SimpleGrid, Center, Circle, Text, Image } from "@chakra-ui/react";

const HomeCategoryBar = () => {
  const data = [
    {
      id: 0,
      title: "Posts",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-mypage.svg"
    },
    {
      id: 1,
      title: "Graduates",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-graduate.svg"
    },
    {
      id: 2,
      title: "Stories",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-story.svg"
    },
    {
      id: 3,
      title: "Institutions",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-institution.svg"
    },
    {
      id: 4,
      title: "Personalities",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
      icon: "/icons/village-personality.svg"
    },
    {
      id: 5,
      title: "Videos",
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
              <Text fontSize="24px" lineHeight="24px" fontWeight="600" textAlign="center">{item.title}</Text>
              <Text fontSize="16px" lineHeight="24px" color="#8888A8" textAlign="center">{item.desc}</Text>
            </VStack>
          ))
        }
      </SimpleGrid>
    </Fragment>
  );
};

export default HomeCategoryBar;
