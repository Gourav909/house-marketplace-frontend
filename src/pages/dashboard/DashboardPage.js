import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "src/components/Dashboard/Dashboard";
import { fetchProperties } from "src/components/Dashboard/dashboard.slice";
import useUserType from "src/hooks/useUserType";

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return parseInt(storedPage) || 1;
  });

  const { properties, paginationData, fetching } = useSelector(
    (state) => state.properties
  );

  const dispatch = useDispatch();
  const isAdmin = useUserType();

  useEffect(() => {
    const queryParams = `page=${currentPage || 1}`;
    dispatch(fetchProperties(queryParams));
  }, []);

  return (
    <Dashboard
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      isAdmin={isAdmin}
      properties={properties}
      paginationData={paginationData}
      fetching={fetching}
    />
  );
};

export default DashboardPage;
