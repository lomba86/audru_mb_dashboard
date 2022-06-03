import React, { useContext, useState } from 'react';
import { Table, Button, Select } from 'antd';
import { sortBy } from 'lodash';
import ParkStatsContext from '../shared/ParkStatsContext';
import { useDistricts } from '../hooks/districts';
import { useProvinces } from '../hooks/province';

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

const LocationUnitStats = () => {
  const { mapInfo } = useContext(ParkStatsContext);
  const { districts, isLoading: isLoadingDistricts } = useDistricts({
    requireProvinces: false,
  });
  const { provinces, isLoading: isLoadingProvinces } = useProvinces({});
  const [showAll, setShowAll] = useState(false);
  const [filterProvinceValue, setFilterProvinceValue] = useState();

  const totals = mapInfo.map((item) => parseInt(item.count));
  const maxTotal = Math.max.apply(null, totals);

  const parsedData = mapInfo.map((districtInfo) => {
    const district = districts.find(
      (dist) => dist.id === districtInfo.distinctId
    );
    const currentTotal = parseInt(districtInfo.count);
    const relativeValue = currentTotal / maxTotal;
    let colorIndex = Math.floor(relativeValue / (1 / colors.length));
    if (currentTotal === maxTotal) {
      colorIndex = colors.length - 1;
    }
    const selectedColor = colors[colorIndex];

    return {
      key: districtInfo.distinctId,
      name: district ? district.name : '',
      value: currentTotal,
      provinceId: district ? district.provinceId : '',
      color: selectedColor,
    };
  });

  const provincesSelectorOption = provinces.filter((province) =>
    parsedData.find((p) => p.provinceId === province.id)
  );

  let data = parsedData;
  if (filterProvinceValue) {
    data = data.filter((item) => item.provinceId === filterProvinceValue);
  }

  data = [...sortBy(data, 'value')].reverse();

  if (!showAll) {
    data = data.slice(0, 10);
  }
  const columns = [
    {
      title: 'Distrito',
      dataIndex: 'name',
      key: 'name',
      render(name: string, item: { color: string }) {
        return (
          <>
            <span
              className="compact-table__indicator"
              style={{ backgroundColor: item.color }}
            />
            <span className="compact-table__name">{name}</span>
          </>
        );
      },
    },
    {
      title: 'Unidades',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <>
      <Select
        loading={isLoadingProvinces}
        value={filterProvinceValue}
        onChange={(newValue) => {
          setFilterProvinceValue(newValue);
        }}
        style={{
          width: 250,
          display: 'block',
          marginLeft: 'auto',
          marginBottom: 10,
        }}
        placeholder="Filtrar por provincia"
        optionFilterProp="children"
        showSearch
        allowClear
      >
        {provincesSelectorOption.map((province) => (
          <Select.Option key={province.id} value={province.id}>
            {province.name}
          </Select.Option>
        ))}
      </Select>
      <Table
        className="compact-table"
        pagination={false}
        dataSource={data}
        columns={columns}
      />
      <div style={{ textAlign: 'right', marginTop: 5 }}>
        <Button size="small" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Mostrar menos' : 'Mostrar todos'}
        </Button>
      </div>
    </>
  );
};
export default LocationUnitStats;
