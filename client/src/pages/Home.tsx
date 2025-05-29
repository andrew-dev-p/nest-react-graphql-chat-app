import Sidebar from "../components/Sidebar";
import MainLayout from "../layouts/MainLayout";
import AuthOverlay from "../components/AuthOverlay";
import ProfileSettings from "../components/ProfileSettings";

const Home = () => {
  return (
    <MainLayout>
      <>
        <AuthOverlay />
        <ProfileSettings />
        <Sidebar />
      </>
    </MainLayout>
  );
};

export default Home;
