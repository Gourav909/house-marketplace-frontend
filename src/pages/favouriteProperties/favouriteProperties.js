import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "src/components/Dashboard/Dashboard";
import { fetchFavoriteProperties } from "../favoriteProperty/Favorite.slice";

const FavouritePropertiesPage = () => {
  const { data, paginationData, isLoading } = useSelector(
    (state) => state.favoriteProperties
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteProperties());
  }, []);

  return (
    <Dashboard
      properties={data}
      paginationData={paginationData}
      fetching={isLoading}
      isFav={true}
    />
  );
};

export default FavouritePropertiesPage;
