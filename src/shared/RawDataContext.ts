import { createContext } from 'react';

export interface RawData {
  id: string;
  'Accelo 710': string;
  Provincia: string;
  Departamento: string;
  Zona: string;
  'Accelo 816': string;
  'Accelo 1016': string;
  Livianos: string;
  Medianos: string;
  Semipesados: string;
  Pesados: string;
  'Total MBT': string;
}

const RawDataContext = createContext<RawData[]>([]);
export default RawDataContext;
