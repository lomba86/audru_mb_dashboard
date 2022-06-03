import { useEffect, useState } from 'react';
import ApiEndpoints from '../shared/ApiEndpoints';
import useFetchApi from './fetch-api';

interface DateRange {
  id: string;
  name: string;
}

export const useZones = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [zones, setZones] = useState<DateRange[]>([]);
  const { request } = useFetchApi();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setZones([]);
      const result = await request(ApiEndpoints.ZONES);
      setZones(result);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataWrapper = () => {
    fetchData();
  };

  useEffect(fetchDataWrapper, []);

  return { isLoading, zones };
};
