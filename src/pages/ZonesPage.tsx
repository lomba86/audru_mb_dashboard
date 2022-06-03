import React, { useState } from 'react';
import { PageHeader, Spin } from 'antd';
import ZoneFiltersModule from '../components/ZoneFilters/ZoneFiltersModule';
import { ZoneFilters } from '../shared/filters';
import TotalsBar from './TotalsBar';
import MainStatsDisplayTabs from './MainStatsDisplayTabs';
import moment from 'moment';
import { useParkStats } from '../hooks/parkStats';
import ParkStatsContext from '../shared/ParkStatsContext';
import { useDateRanges } from '../hooks/dateRanges';
import FiltersContext from '../shared/FiltersContext';

const ZonesPage = () => {
  const [filters, setFilters] = useState<ZoneFilters>({
    selectedDate: undefined,
    dateRange: 'RAN009',
    account: undefined,
    districts: undefined,
    provinces: undefined,
    vehicleCategory: '003', // Trucks
    vehicleModel: undefined,
    vehicleSegment: undefined,
    vehicleType: undefined,
    zones: undefined,
  });

  useDateRanges({
    onLoad: ({ dateLastProcess }) => {
      setFilters({
        ...filters,
        selectedDate: moment(dateLastProcess, 'MM/YYYY'),
      });
    },
  });

  const { parkStats, isLoading: isLoadingParkStats } = useParkStats({
    filters,
  });

  const handleFilterChange = (newFilters: ZoneFilters) => {
    setFilters(newFilters);
  };

  return (
    <ParkStatsContext.Provider value={{ ...parkStats, isLoadingParkStats }}>
      <FiltersContext.Provider value={filters}>
        <div className="page">
          <PageHeader
            style={{
              border: '1px solid rgb(235, 237, 240)',
              marginBottom: 20,
            }}
            title="Zonas"
            subTitle="estadísticas y filtros"
          />
          <ZoneFiltersModule
            appliedFilters={filters}
            onFilterChange={handleFilterChange}
          />
          <TotalsBar />
          {isLoadingParkStats ? (
            <div
              style={{ textAlign: 'center', marginTop: 80, marginBottom: 80 }}
            >
              <Spin size="large" />
              <p style={{ marginTop: 10 }}>Cargando Resultados</p>
            </div>
          ) : (
            <MainStatsDisplayTabs />
          )}
        </div>
      </FiltersContext.Provider>
    </ParkStatsContext.Provider>
  );
};
export default ZonesPage;
