import { useState, useEffect } from 'react';
import axiosClient from "src/config/axios";

import { FAVOURITE_PROPERTIES } from "src/constants/apiUrls";
import { showErrorMessage } from "src/utils/errorHandler";
import { getHeaders } from "src/config/headers";

const useFetchFavouriteProperites = async () => {
  const [favouriteProperties, setFavouriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavouriteProperties = async () => {
      try {
        const headers = getHeaders();
        let response = await axiosClient.get(FAVOURITE_PROPERTIES, headers);

        let data = await response.data;
        if (data) {
          setFavouriteProperties(data.properties);
          setLoading(false);
        }
      } catch (error) {
        showErrorMessage(error);
        setLoading(false);
      }
    }

    getFavouriteProperties();

  }, []);

  return { favouriteProperties, loading };
}

export default useFetchFavouriteProperites;
