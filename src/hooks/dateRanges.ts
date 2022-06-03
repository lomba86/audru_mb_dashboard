import { useEffect, useState } from 'react';
import ApiEndpoints from '../shared/ApiEndpoints';
import useFetchApi from './fetch-api';

interface DateRange {
  id: string;
  offsetYearStart: number;
  offsetYearEnd: number;
  name: string;
}

interface useDateRangesParams {
  onLoad?: ({ dateLastProcess: string }) => void;
}

export const useDateRanges = ({ onLoad }: useDateRangesParams) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [dateRanges, setDateRanges] = useState<DateRange[]>([]);
  const [dateLastProcess, setDateLastProcess] = useState<string>();
  const { request } = useFetchApi();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setDateRanges([]);
      const result = await request(ApiEndpoints.TIME_RANGES);
      setDateRanges(result.timeRanges);
      setDateLastProcess(result.dateLastProcess);
      onLoad && onLoad({ dateLastProcess: result.dateLastProcess });
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

  return { isLoading, dateRanges, dateLastProcess };
};
