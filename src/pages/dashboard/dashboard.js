import React from "react";

import Dashboard from "src/components/Dashboard/Dashboard";
import useFetchProperties from "./hooks/useFetchProperties";

const DashboardPage = () => {
  const { properties, loading } = useFetchProperties();

  return (
    <Dashboard properties={properties} favourites={false} loading={loading} />
  );
};

export default React.memo(DashboardPage);
