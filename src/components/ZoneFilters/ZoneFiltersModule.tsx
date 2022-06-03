import React from 'react';
import ZoneFiltersForm from './ZoneFiltersForm';
import ZoneFiltersStatusBar from './ZoneFiltersStatusBar';
import { ZoneFilters } from '../../shared/filters';

interface ZoneFiltersModuleProps {
  onFilterChange: (filters: ZoneFilters) => void;
  appliedFilters: ZoneFilters;
}

const ZoneFiltersModule: React.FunctionComponent<ZoneFiltersModuleProps> = ({
  onFilterChange,
  appliedFilters,
}) => {
  return (
    <>
      <ZoneFiltersForm
        onFinish={onFilterChange}
        initialValues={appliedFilters}
      />
      <ZoneFiltersStatusBar appliedFilters={appliedFilters} />
    </>
  );
};
export default ZoneFiltersModule;
