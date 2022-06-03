import { useEffect, useState } from 'react';

interface CarDealer {
  name: string;
  position: Position;
}

interface Position {
  lat: number;
  lng: number;
}

export const useCarDealers = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [carDealers, setCarDealers] = useState<CarDealer[]>();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setCarDealers(undefined);
      const response = await fetch('/data/car-dealers.GeoJson');
      const data = await response.json();

      const fetchedCarDealers: CarDealer[] = data.features.map(
        (feature: any) => {
          return {
            name: feature.properties.Name,
            position: {
              lat: feature.geometry.coordinates[1],
              lng: feature.geometry.coordinates[0],
            },
          };
        }
      );
      setCarDealers(fetchedCarDealers);
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

  return { isLoading, carDealers };
};
