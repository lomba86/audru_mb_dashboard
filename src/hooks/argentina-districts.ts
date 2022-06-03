import { useEffect, useState } from 'react';
import { Feature } from 'geojson';
import { random } from 'lodash';

export const useArgentinaDistricts = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [districts, setDistricts] = useState<(Feature & { name: string })[]>();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setDistricts(undefined);
      const response = await fetch('/data/argentina-districts.json');
      const data = await response.json();

      const colors = ['#cccccc', '#dddddd', '#eeeeee', '#eaeaea'];

      data.features = data.features.map((feature: Feature) => {
        return {
          ...feature,
          properties: {
            ...feature.properties,
            color: colors[random(0, colors.length - 1)],
          },
        };
      });

      setDistricts(data.features);
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

  return { isLoading, districts };
};
