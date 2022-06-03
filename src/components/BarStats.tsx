import React from 'react';
import { Col, Row } from 'antd';
import { random } from 'lodash';
import { ResponsiveContainer, BarChart, Bar } from 'recharts';

const BarStats = () => {
  const getData = () => [
    {
      name: 'Page A',
      uv: random(5000),
    },
    {
      name: 'Page B',
      uv: random(5000),
    },
    {
      name: 'Page C',
      uv: random(5000),
    },
    {
      name: 'Page D',
      uv: random(5000),
    },
    {
      name: 'Page E',
      uv: random(5000),
    },
    {
      name: 'Page F',
      uv: random(5000),
    },
    {
      name: 'Page G',
      uv: random(5000),
    },
  ];

  return (
    <Row gutter={40}>
      {[1, 2, 3].map(key => (
        <Col md={8} key={key} style={{ textAlign: 'center' }}>
          <ResponsiveContainer width="100%" aspect={1.8}>
            <BarChart data={getData()}>
              <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      ))}
    </Row>
  );
};
export default BarStats;
