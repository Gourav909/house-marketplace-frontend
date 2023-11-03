import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "src/components/Dashboard/Dashboard";
import { fetchProperties } from "src/components/Dashboard/dashboard.slice";
import useUserType from "src/hooks/useUserType";

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { properties, paginationData, fetching } = useSelector(
    (state) => state.properties
  );

  const dispatch = useDispatch();
  const isAdmin = useUserType();

  useEffect(() => {
    const queryParams = { currentPage: currentPage, query: "" };
    dispatch(fetchProperties(queryParams));
    // eslint-disable-next-line
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
