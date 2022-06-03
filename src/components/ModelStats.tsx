import React, { useContext, useState } from 'react';
import { values, sortBy, filter } from 'lodash';
import ParkStatsContext from '../shared/ParkStatsContext';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { useVehicleModels } from '../hooks/vehicleModels';
import moment from 'moment';
import { Table, Select } from 'antd';
import { useVehicleSegments } from '../hooks/vehicleSegments';
import FiltersContext from '../shared/FiltersContext';
import { useDateRanges } from '../hooks/dateRanges';

const colors = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
  '#fdb877',
  '#fe4032',
  '#881a19',
];

const ModelStats = () => {
  const filters = useContext(FiltersContext);

  const {
    vehicleModels,
    isLoading: isLoadingVehicleModels,
  } = useVehicleModels({ requireFilters: false });

  const {
    isLoading: isLoadingVehicleSegments,
    vehicleSegments,
  } = useVehicleSegments({
    requireCategory: false,
    vehicleCategoryId: filters.vehicleCategory || null,
  });

  const { dateRanges, isLoading: isLoadingDateRanges } = useDateRanges({});

  let offsetYears = 0;
  if (filters.dateRange && !isLoadingDateRanges) {
    try {
      const dateRange = dateRanges.find(
        (dateRange) => dateRange.id === filters.dateRange
      );
      offsetYears = dateRange.offsetYearStart || parseInt(dateRange.name);
    } catch (e) {
      console.log(e);
    }
  }

  const { models: modelsByYearRaw, totalModels } = useContext(ParkStatsContext);

  let modelsByYear = values(modelsByYearRaw).filter((m) => m.startDate);
  modelsByYear = sortBy(modelsByYear, (m) =>
    moment(m.endDate, 'MM/YYYY').unix()
  );
  const [filterSegmentValue, setFilterSegmentValue] = useState();

  const sortedTotalModels = totalModels
    .map(({ cantidad, ...data }) => ({
      ...data,
      value: parseInt(cantidad),
    }))
    .sort((a, b) => b.value - a.value)
    .map((model, index) => ({
      ...model,
      color: index < 9 ? colors[index] : '#ccc',
    }));

  const filteredTotalModels = sortedTotalModels.filter((model) => {
    if (filterSegmentValue && !isLoadingVehicleModels) {
      const modelData = vehicleModels.find((v) => v.id === model.modelId);
      if (modelData) {
        return modelData.vehicleSegmentId === filterSegmentValue;
      } else {
        console.log(`Couldn't find model segment to filter`);
        return false;
      }
    }
    return true;
  });

  const mappedData = modelsByYear.map((year) => {
    let obj = {
      name: `${year.startDate} - ${year.endDate}`,
    };
    year.models.forEach((model) => {
      obj[model.modelName] = parseInt(model.cantidad);
    });
    const total = year.models.reduce(
      (acc, cur) => acc + parseInt(cur.cantidad),
      0
    );
    obj.name = `${obj.name} (Total: ${total})`;

    return obj;
  });

  return (
    <>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <BarChart
            data={mappedData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            style={{
              zIndex: 100,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickFormatter={(a, index) =>
                (modelsByYear.length - index - 1 + offsetYears).toString()
              }
            />
            <YAxis width={40} />
            <Tooltip
              itemStyle={{ margin: 0, padding: 0, lineHeight: '1.1em' }}
              cursor={false}
            />
            {sortedTotalModels.map(({ modelName, color }) => (
              <Bar
                barSize={70}
                key={modelName}
                dataKey={modelName}
                stackId="a"
                fill={color}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 30 }}>
        <Select
          loading={isLoadingVehicleSegments}
          value={filterSegmentValue}
          onChange={(newValue) => {
            setFilterSegmentValue(newValue);
          }}
          style={{
            width: 250,
            display: 'block',
            marginLeft: 'auto',
            marginBottom: 10,
          }}
          placeholder="Filtrar por segmento"
          optionFilterProp="children"
          showSearch
          allowClear
        >
          {vehicleSegments.map((segment) => (
            <Select.Option key={segment.id} value={segment.id}>
              {segment.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Table
        className="compact-table"
        pagination={{
          defaultPageSize: 10,
        }}
        dataSource={filteredTotalModels}
        columns={[
          {
            title: 'Modelo',
            dataIndex: 'modelName',
            key: 'name',
            sorter: (a, b) => a.modelName.localeCompare(b.modelName),
            render(modelName: string, item) {
              return (
                <>
                  <span
                    className="compact-table__indicator"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="compact-table__name">{modelName}</span>
                </>
              );
            },
          },
          {
            title: 'Unidades',
            dataIndex: 'value',
            key: 'value',
            sorter: (a, b) => a.value - b.value,
            defaultSortOrder: 'descend',
            render: (value: number) => Math.trunc(value),
          },
        ]}
        rowKey="id"
      />
    </>
  );
};
export default ModelStats;
