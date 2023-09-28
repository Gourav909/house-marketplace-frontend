import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";

const useUserType = () => {
  const { data } = useSelector((state) => state.login);
  const { currentUserDetails } = useSelector((state) => state.currentUser);
  const [isAdmin, setIsAdmin] = useState(null);

  const getUserType = useCallback(() => {
    if (data.data) {
      setIsAdmin(data.data.type === "Admin");
    } else if (currentUserDetails.user) {
      setIsAdmin(currentUserDetails.user.type === "Admin");
    }
  }, [currentUserDetails]);

  useEffect(() => {
    getUserType();
  }, [currentUserDetails]);

  return isAdmin;
};

export default useUserType;
