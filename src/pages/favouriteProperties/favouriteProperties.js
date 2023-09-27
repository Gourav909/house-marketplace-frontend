import React, { useEffect, useState } from "react";

import Dashboard from "src/components/Dashboard/Dashboard";
import useFetchFavouriteProperites from './hooks/useFetchFavouriteProperites';

const FavouritePropertiesPage = () => {
  const { favouriteProperties, loading } = useFetchFavouriteProperites();

  return (
    <Dashboard
      properties={favouriteProperties}
      favourites={true}
      loading={loading}
    />
  );
};

export default FavouritePropertiesPage;
