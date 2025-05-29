import React, { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { useGeneralStore } from "../stores/generalStore";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const userId = useUserStore((state) => state.id);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);

  useEffect(() => {
    if (!userId) {
      toggleLoginModal();
    }
  }, [toggleLoginModal, userId]);

  if (userId) {
    return children;
  }

  return <>You are not authorized to access this page</>;
};

export default ProtectedRoutes;
