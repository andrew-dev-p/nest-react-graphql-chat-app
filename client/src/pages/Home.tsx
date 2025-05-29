import Sidebar from "../components/Sidebar";
import MainLayout from "../layouts/MainLayout";
import { Flex } from "@mantine/core";

const Home = () => {
  return (
    <MainLayout>
      <>
        <Sidebar />
        <Flex>Home</Flex>
      </>
    </MainLayout>
  );
};

export default Home;
