import React from 'react';
import { find } from 'lodash';
import { ZoneFilters } from '../../shared/filters';
import { Card, Tag } from 'antd';
import { DateFormatEnum } from '../../shared/dates';
import { useDateRanges } from '../../hooks/dateRanges';
import { useAccounts } from '../../hooks/accounts';
import { useZones } from '../../hooks/zones';
import { useProvinces } from '../../hooks/province';
import { useDistricts } from '../../hooks/districts';
import { useVehicleCategories } from '../../hooks/vehicleCategories';
import { useVehicleSegments } from '../../hooks/vehicleSegments';
import { useVehicleTypes } from '../../hooks/vehicleTypes';
import { useVehicleModels } from '../../hooks/vehicleModels';

interface ZoneFiltersStatusBarProps {
  appliedFilters: ZoneFilters;
}

const ZoneFiltersStatusBar: React.FunctionComponent<ZoneFiltersStatusBarProps> = ({
  appliedFilters,
}) => {
  const { dateRanges } = useDateRanges({});
  const activeDateRange = find(dateRanges, { id: appliedFilters.dateRange });

  const { accounts } = useAccounts();
  const activeAccount = appliedFilters.account
    ? find(accounts, {
        id: appliedFilters.account,
      })
    : undefined;

  const { zones } = useZones();
  const activeZones = appliedFilters.zones
    ? appliedFilters.zones.map((zoneId) =>
        find(zones, {
          id: zoneId,
        })
      )
    : [];

  const { provinces } = useProvinces({});
  const activeProvinces = appliedFilters.provinces
    ? appliedFilters.provinces.map((provinceId) =>
        find(provinces, {
          id: provinceId,
        })
      )
    : [];

  const { districts } = useDistricts({ requireProvinces: false });
  const activeDistricts = appliedFilters.districts
    ? appliedFilters.districts.map((districtId) =>
        find(districts, {
          id: districtId,
        })
      )
    : [];

  const { vehicleCategories } = useVehicleCategories();
  const activeVehicleCategory = appliedFilters.vehicleCategory
    ? find(vehicleCategories, {
        id: appliedFilters.vehicleCategory,
      })
    : undefined;

  const { vehicleSegments } = useVehicleSegments({ requireCategory: false });
  const activeVehicleSegment = appliedFilters.vehicleSegment
    ? find(vehicleSegments, {
        id: appliedFilters.vehicleSegment,
      })
    : undefined;

  const { vehicleTypes } = useVehicleTypes({ requireCatSeg: false });
  const activeVehicleType = appliedFilters.vehicleType
    ? find(vehicleTypes, {
        id: appliedFilters.vehicleType,
      })
    : undefined;

  const { vehicleModels } = useVehicleModels({ requireFilters: false });
  const activeVehicleModel = appliedFilters.vehicleModel
    ? find(vehicleModels, {
        id: appliedFilters.vehicleModel,
      })
    : undefined;

  return (
    <Card title="Filtros aplicados" className="filter-bar">
      <Tag className="filter-bar__tag">
        <span className="filter-bar__tag-value">
          {appliedFilters.selectedDate &&
            appliedFilters.selectedDate.format(
              DateFormatEnum.STANDARD_MONTH_YEAR
            )}
        </span>
        <span className="filter-bar__tag-name">Mes-Año</span>
      </Tag>
      <Tag className="filter-bar__tag">
        <span className="filter-bar__tag-value">
          {activeDateRange ? activeDateRange.name : '...'}
        </span>
        <span className="filter-bar__tag-name">Rango</span>
      </Tag>
      {activeAccount && (
        <Tag className="filter-bar__tag">
          <span className="filter-bar__tag-value">
            {activeAccount ? activeAccount.name : '...'}
          </span>{' '}
          <span className="filter-bar__tag-name">Cuenta</span>
        </Tag>
      )}
      {activeZones &&
        activeZones.map((zone) => (
          <Tag className="filter-bar__tag">
            <span className="filter-bar__tag-value">
              {zone ? zone.name : '...'}
            </span>{' '}
            <span className="filter-bar__tag-name">Zona</span>
          </Tag>
        ))}
      {activeProvinces &&
        activeProvinces.map((province) => (
          <Tag className="filter-bar__tag">
            <span className="filter-bar__tag-value">
              {province ? province.name : '...'}
            </span>{' '}
            <span className="filter-bar__tag-name">Provincia</span>
          </Tag>
        ))}
      {activeDistricts &&
        activeDistricts.map((district) => (
          <Tag className="filter-bar__tag">
            <span className="filter-bar__tag-value">
              {district ? district.name : '...'}
            </span>{' '}
            <span className="filter-bar__tag-name">Departamento</span>
          </Tag>
        ))}
      {activeVehicleCategory && (
        <Tag className="filter-bar__tag">
          <span className="filter-bar__tag-value">
            {activeVehicleCategory ? activeVehicleCategory.name : '...'}
          </span>{' '}
          <span className="filter-bar__tag-name">Categoría</span>
        </Tag>
      )}
      {activeVehicleSegment && (
        <Tag className="filter-bar__tag">
          <span className="filter-bar__tag-value">
            {activeVehicleSegment ? activeVehicleSegment.name : '...'}
          </span>{' '}
          <span className="filter-bar__tag-name">Segmento</span>
        </Tag>
      )}
      {activeVehicleType && (
        <Tag className="filter-bar__tag">
          <span className="filter-bar__tag-value">
            {activeVehicleType ? activeVehicleType.name : '...'}
          </span>{' '}
          <span className="filter-bar__tag-name">Tipo</span>
        </Tag>
      )}
      {activeVehicleModel && (
        <Tag className="filter-bar__tag">
          <span className="filter-bar__tag-value">
            {activeVehicleModel ? activeVehicleModel.name : '...'}
          </span>{' '}
          <span className="filter-bar__tag-name">Modelo</span>
        </Tag>
      )}
    </Card>
  );
};
export default ZoneFiltersStatusBar;
