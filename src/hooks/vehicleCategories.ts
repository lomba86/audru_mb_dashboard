import { useEffect, useState } from 'react';
import ApiEndpoints from '../shared/ApiEndpoints';
import useFetchApi from './fetch-api';

interface VehicleCategory {
  id: string;
  name: string;
}

export const useVehicleCategories = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>(
    []
  );
  const { request } = useFetchApi();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setVehicleCategories([]);
      const result = await request(ApiEndpoints.VEHICLE_CATEGORIES);
      setVehicleCategories(result);
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

  return { isLoading, vehicleCategories };
};
