import { useState, useEffect, useCallback } from 'react';

import { PROPERTIES } from "src/constants/apiUrls";
import axiosClient from "src/config/axios";
import { showErrorMessage } from "src/utils/errorHandler";
import { getHeaders } from "src/config/headers";

const useFetchProperties = async () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log("here", loading);

  const getProperties = useCallback(async () => {
    try {
      setLoading(true);
      const headers = getHeaders();
      let response = await axiosClient.get(PROPERTIES, headers);

      let data = await response.data;
      if (data) {
        setProperties(data.properties);
        setLoading(false);
      }
    } catch (error) {
      showErrorMessage(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProperties();
  }, []);

  return { properties, loading };
}

export default useFetchProperties;
