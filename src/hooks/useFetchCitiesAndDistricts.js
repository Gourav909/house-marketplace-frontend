import { useState, useEffect, useCallback } from "react";

import { FETCH_CITIES } from "src/constants/apiUrls";
import axiosClient from "src/config/axios";
import { showErrorMessage } from "src/utils/errorHandler";
import { getHeaders } from "src/config/headers";

const useFetchCitiesAndDistricts = () => {
  const [data, setData] = useState({});

  const getCitiesAndDistricts = useCallback(async () => {
    try {
      const headers = getHeaders();
      let response = await axiosClient.get(FETCH_CITIES, headers);

      let data = await response.data;
      if (data) {
        setData(data);
      }
    } catch (error) {
      showErrorMessage(error);
    }
  }, []);

  useEffect(() => {
    getCitiesAndDistricts();
  }, []);

  return data;
};

export default useFetchCitiesAndDistricts;
