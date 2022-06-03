import React, { useContext } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Row, Col } from 'antd';
import { sortBy } from 'lodash';
import { extrapolatePercentages } from '../shared/extrapolatePercentages';
import ParkStatsContext from '../shared/ParkStatsContext';
import { useVehicleSegments } from '../hooks/vehicleSegments';
import CustomRechartTooltipContent from './CustomRechartTooltipContent';

interface Segment {
  id: string;
  name: string;
  value: number;
  color: string;
  imageUrl: string;
}

const colors = [
  '#fe0000',
  '#ff7e50',
  '#32cd33',
  '#6594ec',
  '#C9F0FF',
  '#ff7e50',
  '#EAFFFD',
  '#EFEFF0',
  '#D5CAD6',
];

const SegmentsStats = () => {
  const { vehicleSegments } = useVehicleSegments({ requireCategory: false });
  const { segments } = useContext(ParkStatsContext);

  let parsedSegments: Segment[] = segments.map((segment, index) => {
    const vehicleSegment = vehicleSegments.find(
      (vehicleSegment) => vehicleSegment.id === segment.segmentId
    );

    return {
      id: segment.segmentId,
      name: vehicleSegment ? vehicleSegment.name : '',
      value: parseInt(segment.count),
      color: colors[index],
      imageUrl: vehicleSegment
        ? `/example-trucks/${vehicleSegment.name}.png`
        : '',
    };
  });

  let data = extrapolatePercentages<Segment>(parsedSegments);
  data = [...sortBy(data, 'value')].reverse();
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Row gutter={20}>
      <Col md={9}>
        <ResponsiveContainer width="100%" aspect={1}>
          <PieChart style={{ zIndex: 1000 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="100%"
              innerRadius="60%"
              fill="#8884d8"
            >
              {data.map((segment, index) => (
                <Cell key={`cell-${index}`} fill={segment.color} />
              ))}
            </Pie>
            <Tooltip content={CustomRechartTooltipContent} />
          </PieChart>
        </ResponsiveContainer>
      </Col>
      <Col md={15}>
        <div className="stats-bars">
          {data.map((segment) => (
            <div className="stats-bars__item" key={segment.id}>
              <Row>
                <Col md={5}>
                  <img
                    className="stats-bars__image"
                    src={segment.imageUrl}
                    alt={segment.name}
                  />
                </Col>
                <Col md={14}>
                  <span className="stats-bars__title">{segment.name}</span>
                  <span className="stats-bars__bar">
                    <span
                      className="stats-bars__bar-filled"
                      style={{
                        backgroundColor: segment.color,
                        width: `${segment.percentageStr}%`,
                      }}
                    />
                  </span>
                </Col>
                <Col md={5}>
                  <span className="stats-bars__value">{segment.value}</span>
                </Col>
              </Row>
            </div>
          ))}

          <hr />
          <Row>
            <Col md={5} />
            <Col md={14}>
              <span>Unidades Totales</span>
            </Col>
            <Col md={5}>
              <span className="stats-bars__value">{total}</span>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};
export default SegmentsStats;
