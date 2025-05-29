import Sidebar from "../components/Sidebar";
import MainLayout from "../layouts/MainLayout";
import { Flex } from "@mantine/core";
import AuthOverlay from "../components/AuthOverlay";

const Home = () => {
  return (
    <MainLayout>
      <>
        <AuthOverlay />
        <Sidebar />
        <Flex>Home</Flex>
      </>
    </MainLayout>
  );
};

export default Home;
