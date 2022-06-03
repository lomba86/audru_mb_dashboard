import { useEffect, useState } from 'react';
import ApiEndpoints from '../shared/ApiEndpoints';
import { ZoneFilters } from '../shared/filters';
import { useDateRanges } from './dateRanges';
import moment from 'moment';
import useFetchApi from './fetch-api';

export interface ParkStatsData {
  totals: {
    km2: string;
    unitCount: string;
    ppCount: string;
  };
  segments: {
    segmentId: string;
    count: string;
    segmentImageUrl: string;
  }[];
  mapInfo: {
    distinctId: string;
    count: string;
  }[];
  accounts: {
    accountId: string;
    count: string;
  }[];
  models: {
    startDate: string;
    endDate: string;
    models: {
      modelName: string;
      modelId: string;
      cantidad: string;
    }[];
  }[];
  totalModels: {
    modelId: string;
    modelName: string;
    cantidad: string;
  }[];
}

export const useParkStats = ({ filters }: { filters: ZoneFilters }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [parkStats, setParkStats] = useState<ParkStatsData>({
    accounts: [],
    mapInfo: [],
    models: [],
    segments: [],
    totals: {
      km2: '0',
      unitCount: '0',
      ppCount: '0',
    },
    totalModels: [],
  });
  const { request } = useFetchApi();

  const { dateRanges, isLoading: isLoadingDateRanges } = useDateRanges({});

  const fetchData = async () => {
    if (isLoadingDateRanges || !filters.selectedDate) {
      return;
    }

    try {
      setIsLoading(true);

      const dateRange = dateRanges.find(
        (dateRange) => dateRange.id === filters.dateRange
      );

      const args = {
        rangeId: filters.dateRange,
        startDate: moment(filters.selectedDate)
          .subtract(dateRange.offsetYearEnd, 'years')
          .format('MM/YYYY'),
        endDate: moment(filters.selectedDate)
          .subtract(dateRange.offsetYearStart, 'years')
          .format('MM/YYYY'),
        accountId: filters.account || null,
        zoneIds: filters.zones && filters.zones.length ? filters.zones : null,
        provinceIds:
          filters.provinces && filters.provinces.length
            ? filters.provinces
            : null,
        districtIds:
          filters.districts && filters.districts.length
            ? filters.districts
            : null,
        vehicleCategoryId: filters.vehicleCategory || null,
        vehicleSegmentId: filters.vehicleSegment || null,
        vehicleTypeId: filters.vehicleType || null,
        vehicleModelId: filters.vehicleModel || null,
      };
      const response = await request(ApiEndpoints.PARK_STATS, args);
      console.log('repsonse', response);
      setParkStats(response);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataWrapper = () => {
    fetchData();
  };

  useEffect(fetchDataWrapper, [filters, isLoadingDateRanges]);

  return { isLoading, parkStats };
};
