import { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import ApiEndpoints from '../shared/ApiEndpoints';
import useFetchApi from './fetch-api';

interface Account {
  id: string;
  name: string;
}

export const useAccounts = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { request } = useFetchApi();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setAccounts([]);
      const result = await request(ApiEndpoints.ACCOUNTS);
      const sortedResults = sortBy(result, 'name');
      setAccounts(sortedResults);
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

  return { isLoading, accounts };
};
