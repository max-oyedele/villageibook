import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";

import {
  Container,
  Flex,
  Box,
  Text,
  HStack,
  VStack,
  Divider,
  Button,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import SearchBar from "components/SearchBar";
import VideoCard from "components/VideoCard";
import PremiumCard from "components/PremiumCard";
import SignupCard from "components/SignupCard";
import RecentVillageCard from "components/RecentVillageCard";
import PostCard from "components/PostCard";
import CaptionCard from "components/CaptionCard";
import GraduateStatCard from "components/GraduateStatCard";
import RecentUserCard from "components/RecentUserCard";

const myVillageItems = [
  {
    id: 0,
    name: "My Pages",
    img: "/icons/myvillage-mypage.svg",
  },
  {
    id: 1,
    name: "Village Graduates",
    img: "/icons/myvillage-graduate.svg",
  },
  {
    id: 2,
    name: "Society",
    img: "/icons/myvillage-society.svg",
  },
  {
    id: 3,
    name: "Personalities",
    img: "/icons/myvillage-personality.svg",
  },
  {
    id: 4,
    name: "Institutions",
    img: "/icons/myvillage-institution.svg",
  },
  {
    id: 5,
    name: "Videos",
    img: "/icons/myvillage-video.svg",
  },
];

const recentVillages = [
  {
    id: 0,
    name: "Syedpur",
    img: "/images/village-card1.png",
    recentAt: 1,
  },
  {
    id: 1,
    name: "Panchpara",
    img: "/images/village-card2.png",
    recentAt: 2,
  },
  {
    id: 2,
    name: "Rasulpur",
    img: "/images/village-card1.png",
    recentAt: 4,
  },
];

const posts = [
  {
    id: 0,
    user: { name: "Nusrat Rahman", img: "/images/nusrat.png" },
    ago: "3 hours ago",
    post: {
      text: "Consequat duis enim velit mollit. Exercitation veniam consequat sunt.",
      imgs: ["/images/nusrat-post.png"],
    },
  },
  {
    id: 1,
    user: { name: "Sarmin Degum", img: "/images/sarmin.png" },
    ago: "5 hours ago",
    post: {
      text: "Consequat duis enim velit mollit. Exercitation veniam consequat sunt.",
      imgs: ["/images/sarmin-post1.png", "/images/sarmin-post2.png"],
    },
  },
  {
    id: 2,
    user: { name: "Sonia Khatun", img: "/images/sonia.png" },
    ago: "1 day ago",
    post: {
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.",
      imgs: ["/images/sonia-post.png"],
    },
  },
];

const recentUsers = [
  {
    id: 0,
    name: "sarmin begum",
    img: "/images/sarmin.png",
    recentAt: 1,
  },
  {
    id: 1,
    name: "Nusrat Rahman",
    img: "/images/sonia.png",
    recentAt: 2,
  },
];

const Home: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const tabsMobile = ["Feed", "My Village", "Graduates"];
  const [activeTab, setActiveTab] = useState(tabsMobile[0]);

  return (
    <Fragment>
      <Header />
      <Container maxW="full" p={6}>
        <Box mt={4}>
          <PageTitle title="Find Village" />
        </Box>
        <Box mt={10} px={{ lg: 20 }}>
          <SearchBar />
        </Box>

        {breakpointValue === "base" && (
          <Box mt={12}>
            <TabsMobile
              tabs={tabsMobile}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Box>
        )}

        <HStack spacing={6} mt={12} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <Box bgColor="white" p={4} borderRadius="6px" mb={6}>
                <VideoCard />
                <HStack mt={8}>
                  <Divider />
                  <Button
                    w="full"
                    h="30px"
                    bgColor="purpleTone"
                    color="white"
                    fontSize="10px"
                  >
                    MY VILLAGE
                  </Button>
                  <Divider />
                </HStack>
                <Box my={6}>
                  <MyVillageItems />
                </Box>
              </Box>
              <PremiumCard />
              <SignupCard />
              <Text fontSize="26px" fontWeight="bold" my={10}>
                Recently developed
              </Text>
              <VStack spacing={4}>
                {recentVillages.map((village) => (
                  <RecentVillageCard key={village.name} {...village} />
                ))}
              </VStack>
            </Box>
          )}

          <Box w={{ base: "100%", md: "50%" }}>
            {(breakpointValue === "md" ||
              (breakpointValue === "base" && activeTab === "Feed")) && (
              <VStack spacing={4}>
                {posts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </VStack>
            )}
            {activeTab === "My Village" && (
              <Box>
                <MyVillageItems />
                <Box mt={12}>
                  <PremiumCard />
                </Box>
                <Text fontSize="20px" mt={12} mb={6}>
                  Recently developed
                </Text>
                <VStack spacing={4}>
                  {recentVillages.map((village) => (
                    <RecentVillageCard key={village.name} {...village} />
                  ))}
                </VStack>
              </Box>
            )}
            {activeTab === "Graduates" && (
              <Box>
                <GraduateStatCard villageName="jammura" />
                <Box mt={12}>
                  <VideoCard />
                </Box>
                <Text fontSize="20px" mt={12} mb={6}>
                  Recently joined
                </Text>
                <VStack spacing={4}>
                  {recentUsers.map((user) => (
                    <RecentUserCard key={user.name} {...user} />
                  ))}
                </VStack>
              </Box>
            )}
          </Box>

          {breakpointValue === "md" && (
            <Box w="25%">
              <CaptionCard caption="caption" desc="Text Block" />
              <Text fontSize="26px" fontWeight="bold" my={10}>
                Graduates
              </Text>
              <GraduateStatCard villageName="jammura" />
              <Text fontSize="26px" fontWeight="bold" my={10}>
                Recently joined
              </Text>
              <VStack spacing={4}>
                {recentUsers.map((user) => (
                  <RecentUserCard key={user.name} {...user} />
                ))}
              </VStack>
            </Box>
          )}
        </HStack>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

const TabsMobile: React.FC<{
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}> = (props) => {
  return (
    <Fragment>
      <HStack borderTop="1px" borderBottom="1px" borderColor="gray.300">
        {props.tabs.map((tab) => (
          <Box
            key={tab}
            w="full"
            py={4}
            borderBottom={`${
              tab === props.activeTab ? "2px solid #553CFB" : ""
            }`}
            onClick={() => props.setActiveTab(tab)}
          >
            <Text
              textAlign="center"
              color={`${tab === props.activeTab ? "purpleTone" : ""}`}
            >
              {tab}
            </Text>
          </Box>
        ))}
      </HStack>
    </Fragment>
  );
};

const MyVillageItems = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <VStack
      spacing={2}
      divider={breakpointValue === "base" ? <Divider /> : <></>}
    >
      {myVillageItems.map((item) => (
        <HStack
          key={item.name}
          w="full"
          h={{ base: "60px", md: "40px" }}
          spacing={4}
        >
          <Image
            src={item.img}
            alt=""
            w={{ base: "50px", md: "30px" }}
            h={{ base: "50px", md: "30px" }}
          />
          <Text fontSize="13px" fontWeight="bold">
            {item.name}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};

export default Home;
