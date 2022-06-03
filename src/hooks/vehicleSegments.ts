import { useEffect, useState } from 'react';
import ApiEndpoints from '../shared/ApiEndpoints';
import useFetchApi from './fetch-api';
import { sortBy } from 'lodash';

interface VehicleSegment {
  id: string;
  name: string;
}

interface useVehicleSegment {
  vehicleCategoryId?: string;
  requireCategory?: boolean;
}

export const useVehicleSegments = ({
  vehicleCategoryId,
  requireCategory = true,
}: useVehicleSegment) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vehicleSegments, setVehicleSegments] = useState<VehicleSegment[]>([]);
  const { request } = useFetchApi();

  const fetchData = async () => {
    if (requireCategory && !vehicleCategoryId) {
      setVehicleSegments([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setVehicleSegments([]);
      const result = await request(ApiEndpoints.VEHICLE_SEGMENTS, {
        categoryId: vehicleCategoryId,
      });
      const orderedResult = sortBy(result, 'id');
      setVehicleSegments(orderedResult);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataWrapper = () => {
    fetchData();
  };

  useEffect(fetchDataWrapper, [vehicleCategoryId]);

  return { isLoading, vehicleSegments };
};
