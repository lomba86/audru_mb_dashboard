import { createContext } from 'react';

import { ZoneFilters } from './filters';

const FiltersContext = createContext<ZoneFilters>(undefined);
export default FiltersContext;
