import React, { useState, useContext, useEffect, useRef } from 'react';
import { Map, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { StyleFunction, Icon as LeafletIcon } from 'leaflet';
import { Feature, Geometry } from 'geojson';
import { Button, Spin } from 'antd';
import ParkStatsContext from '../shared/ParkStatsContext';
import { useArgentinaDistricts } from '../hooks/argentina-districts';
import { useArgentinaProvinces } from '../hooks/argentina-provinces';
import { useCarDealers } from '../hooks/carDealers';

const pointerIcon = new LeafletIcon({
  iconUrl: '/icons/location-pin-mercedes.svg',
  iconRetinaUrl: '/icons/location-pin-mercedes.svg',
  iconAnchor: [11, 30],
  popupAnchor: [0, -15],
  iconSize: [23, 30],
});

const colors = [
  '#fbe9e7',
  '#ffccbc',
  '#ffab91',
  '#ff8a65',
  '#ff7043',
  '#ff5722',
  '#f4511e',
  '#e64a19',
  '#d84315',
  '#bf360c',
];

const InteractiveMap = () => {
  const position: [number, number] = [-40.2570625, -62.771536];
  const zoom = 4;
  const [showCarDealers, setShowCarDealers] = useState(false);
  const districtsLayerRef = useRef(null);
  const mapRef = useRef(null);

  const { mapInfo, isLoadingParkStats } = useContext(ParkStatsContext);
  const { districts, isLoading: isLoadingDistricts } = useArgentinaDistricts();
  const { provinces, isLoading: isLoadingProvinces } = useArgentinaProvinces();
  const { carDealers, isLoading: isLoadingCarDealers } = useCarDealers();

  const getStyles: StyleFunction = (
    props: Feature<Geometry & { color: string; id: string }> | undefined
  ) => {
    return {
      color: '#fff',
      fillColor: props.geometry.color,
      fillOpacity: 0.8,
      weight: 1,
    };
  };

  const getProvincesStyle: StyleFunction = (
    props: Feature<Geometry, { color: string; name: string }> | undefined
  ) => {
    const color = props && props.properties.color;
    return { color, fillColor: color, fillOpacity: 0.5, opacity: 0.5 };
  };

  const toggleCarDealers = () => {
    setShowCarDealers(!showCarDealers);
  };

  const totals = mapInfo.map((item) => parseInt(item.count));

  const maxTotal = Math.max.apply(null, totals);
  let filteredDistrictsResults = !isLoadingDistricts
    ? districts.map((district) => {
        const result = mapInfo.find((i) => i.distinctId === district.id);
        if (result) {
          const currentTotal = parseInt(result.count);

          const relativeValue = currentTotal / maxTotal;

          let colorIndex = Math.floor(relativeValue / (1 / colors.length));
          if (currentTotal === maxTotal) {
            colorIndex = colors.length - 1;
          }

          const selectedColor = colors[colorIndex];

          return {
            ...district,
            count: result.count,
            color: selectedColor,
          };
        }
        return undefined;
      })
    : [];
  filteredDistrictsResults = filteredDistrictsResults.filter(Boolean);

  useEffect(() => {
    setTimeout(() => {
      if (
        filteredDistrictsResults.length &&
        districtsLayerRef &&
        districtsLayerRef.current
      ) {
        const layer = districtsLayerRef.current.leafletElement;
        const bounds = layer.getBounds();
        mapRef.current.leafletElement.fitBounds(bounds);
      }
    }, 200);
  }, [filteredDistrictsResults]);

  if (isLoadingParkStats) {
    return <Spin />;
  }

  const onEachFeature = (feature: any, layer: any) => {
    layer.bindPopup(() => {
      return `${feature.name}: ${parseInt(feature.count || '0')}`;
    });
  };

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
        <Button onClick={toggleCarDealers}>
          {showCarDealers ? 'Ocultar Concesionarios' : 'Ver Concesionarios'}
        </Button>
      </div>
      <div className="map-reference">
        {[...colors].reverse().map((color, index) => (
          <span className="map-reference__item">
            <span
              className="map-reference__item-square"
              style={{ backgroundColor: color }}
            />
            {index === 0 && (
              <span className="map-reference__item-text">{maxTotal}</span>
            )}
            {index === colors.length - 1 && (
              <span className="map-reference__item-text">0</span>
            )}
          </span>
        ))}
      </div>
      <Map
        ref={mapRef}
        center={position}
        zoom={zoom}
        style={{ height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {!isLoadingProvinces && (
          <GeoJSON data={provinces} style={getProvincesStyle} />
        )}
        {!isLoadingDistricts && (
          <GeoJSON
            ref={districtsLayerRef}
            data={filteredDistrictsResults}
            style={getStyles}
            onEachFeature={onEachFeature}
          />
        )}
        {showCarDealers &&
          !isLoadingCarDealers &&
          carDealers.map((carDealer) => (
            <Marker
              position={carDealer.position}
              icon={pointerIcon}
              key={carDealer.name}
            >
              <Popup>{carDealer.name}</Popup>
            </Marker>
          ))}
      </Map>
    </div>
  );
};
export default InteractiveMap;
