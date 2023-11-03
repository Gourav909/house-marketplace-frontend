import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "src/components/Dashboard/Dashboard";
import { fetchFavoriteProperties } from "./Favorite.slice";

const FavouritePropertiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, paginationData, isLoading } = useSelector((state) => {
    return state.favoriteProperties;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteProperties(1));
  // eslint-disable-next-line
  }, []);

  return (
    <Dashboard
      properties={data}
      paginationData={paginationData}
      fetching={isLoading}
      fromFavoritePage={true}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
    />
  );
};

export default FavouritePropertiesPage;
