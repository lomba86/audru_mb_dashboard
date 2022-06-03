import { useEffect, useState } from 'react';
import ApiEndpoints from '../shared/ApiEndpoints';
import useFetchApi from './fetch-api';

interface Province {
  id: string;
  name: string;
}

interface useProvincesProps {
  accountId?: string;
  zoneIds?: string;
}

export const useProvinces = ({ accountId, zoneIds }: useProvincesProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const { request } = useFetchApi();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setProvinces([]);
      const result = await request(ApiEndpoints.PROVINCES, {
        accountId,
        zoneIds,
      });
      setProvinces(result);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataWrapper = () => {
    fetchData();
  };

  useEffect(fetchDataWrapper, [accountId, zoneIds]);

  return { isLoading, provinces };
};
