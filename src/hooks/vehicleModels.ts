import { useEffect, useState } from 'react';
import ApiEndpoints from '../shared/ApiEndpoints';
import useFetchApi from './fetch-api';

interface vehicleModels {
  id: string;
  name: string;
  vehicleSegmentId: string;
}

interface useVehicleModelsProps {
  vehicleCategoryId?: string;
  vehicleSegmentId?: string;
  vehicleType?: string;
  requireFilters?: boolean;
}

export const useVehicleModels = ({
  vehicleCategoryId,
  vehicleSegmentId,
  vehicleType,
  requireFilters = true,
}: useVehicleModelsProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [vehicleModels, setVehicleModels] = useState<vehicleModels[]>([]);
  const { request } = useFetchApi();

  const fetchData = async () => {
    if (
      requireFilters &&
      (!vehicleCategoryId || !vehicleSegmentId || !vehicleType)
    ) {
      setVehicleModels([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setVehicleModels([]);
      const result = await request(ApiEndpoints.VEHICLE_MODELS, {
        categoryId: vehicleCategoryId || null,
        vehicleSegmentId: vehicleSegmentId || null,
        vehicleType: vehicleType || null,
      });
      setVehicleModels(result);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataWrapper = () => {
    fetchData();
  };

  useEffect(fetchDataWrapper, [
    vehicleCategoryId,
    vehicleSegmentId,
    vehicleType,
  ]);

  return { isLoading, vehicleModels };
};
