import { createContext } from 'react';
import { ParkStatsData } from '../hooks/parkStats';

const ParkStatsContext = createContext<
  ParkStatsData & { isLoadingParkStats: boolean }
>(undefined);
export default ParkStatsContext;
