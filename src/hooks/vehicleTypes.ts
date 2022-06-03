import { useEffect, useState } from 'react';
import ApiEndpoints from '../shared/ApiEndpoints';
import useFetchApi from './fetch-api';

interface VehicleType {
  id: string;
  name: string;
}

interface useVehicleTypeProps {
  vehicleCategoryId?: string;
  vehicleSegmentId?: string;
  requireCatSeg?: boolean;
}

export const useVehicleTypes = ({
  vehicleCategoryId,
  vehicleSegmentId,
  requireCatSeg = true,
}: useVehicleTypeProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const { request } = useFetchApi();

  const fetchData = async () => {
    if (requireCatSeg && (!vehicleCategoryId || !vehicleSegmentId)) {
      setVehicleTypes([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setVehicleTypes([]);
      const result = await request(ApiEndpoints.VEHICLE_TYPES, {
        categoryId: vehicleCategoryId,
        segmentId: vehicleSegmentId,
      });
      setVehicleTypes(result);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataWrapper = () => {
    fetchData();
  };

  useEffect(fetchDataWrapper, [vehicleCategoryId, vehicleSegmentId]);

  return { isLoading, vehicleTypes };
};
