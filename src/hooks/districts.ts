import { useEffect, useState } from 'react';
import ApiEndpoints from '../shared/ApiEndpoints';
import useFetchApi from './fetch-api';

interface District {
  id: string;
  name: string;
  provinceId: string;
  accountId: string;
}

interface useDistrictsProps {
  provinceIds?: string[];
  requireProvinces?: boolean;
  accountId?: string;
}

export const useDistricts = ({
  provinceIds,
  requireProvinces = true,
  accountId,
}: useDistrictsProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [districts, setDistricts] = useState<District[]>([]);
  const { request } = useFetchApi();

  const fetchData = async () => {
    if (requireProvinces && (!provinceIds || !provinceIds.length)) {
      setDistricts([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setDistricts([]);
      const result = await request(ApiEndpoints.DISTRICTS, {
        provinceIds,
        accountId: accountId || null,
      });
      setDistricts(result);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataWrapper = () => {
    fetchData();
  };

  useEffect(fetchDataWrapper, [provinceIds]);

  return { isLoading, districts };
};
