import { useEffect, useState } from 'react';
import { Feature } from 'geojson';

export const useArgentinaProvinces = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [provinces, setProvinces] = useState<Feature[]>();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setProvinces(undefined);
      const response = await fetch(
        '/data/argentina-provinces-simplified.GeoJson'
      );
      const data = await response.json();

      data.features = data.features.map((feature: Feature) => {
        return {
          ...feature,
          properties: {
            ...feature.properties,
            color: '#cecece',
          },
        };
      });

      setProvinces(data);
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

  return { isLoading, provinces };
};
