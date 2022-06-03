import moment from 'moment';

export interface ZoneFilters {
  selectedDate: moment.Moment;
  dateRange: string;
  account: string | undefined;
  zones: string[] | undefined;
  provinces: string[] | undefined;
  districts: string[] | undefined;
  vehicleCategory: string | undefined;
  vehicleSegment: string | undefined;
  vehicleType: string | undefined;
  vehicleModel: string | undefined;
}

export enum ZoneFiltersEnum {
  selectedDate = 'selectedDate',
  category = 'category',
  model = 'model',
  truckType = 'truckType',
  zone = 'zone',
  province = 'province',
  district = 'district',
  segment = 'segment',
}

export const ZoneFiltersLabelsEnum: { [index: string]: string } = {
  [ZoneFiltersEnum.selectedDate]: 'Mes-Año',
  [ZoneFiltersEnum.category]: 'Tipo de Categoría',
  [ZoneFiltersEnum.model]: 'Modelo',
  [ZoneFiltersEnum.truckType]: 'Tipo',
  [ZoneFiltersEnum.zone]: 'Zona',
  [ZoneFiltersEnum.province]: 'Provincia',
  [ZoneFiltersEnum.district]: 'Departamento',
  [ZoneFiltersEnum.segment]: 'Segmento',
};
