import React from 'react';
import { Col, Row } from 'antd';
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from 'recharts';

const CircleStats = () => {
  const data = [
    { name: '4x2', value: 55, color: '#e2cb63' },
    { name: '6x2', value: 85, color: '#55a290' },
    { name: '6x4', value: -46, color: '#c8656a' },
  ];

  const CustomLabel = (params: any) => {
    const { cx, cy } = params.viewBox;
    return (
      <text
        x={cx}
        y={cy}
        fill="#3d405c"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="26">
          {params.value1}%
        </tspan>
      </text>
    );
  };

  return (
    <Row gutter={80}>
      {data.map(item => (
        <Col md={8} key={item.name} style={{ textAlign: 'center' }}>
          <ResponsiveContainer width="100%" aspect={1}>
            <PieChart>
              <Pie
                data={[
                  { ...item, value: Math.abs(item.value) },
                  { name: '', value: 100 - Math.abs(item.value) },
                ]}
                cx="50%"
                cy="50%"
                outerRadius="100%"
                innerRadius="80%"
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                startAngle={450}
                endAngle={90}
              >
                <Cell key={`cell-${item.name}`} fill={item.color} />
                <Cell key={`cell-${item.name}`} fill="#f0f0f0" />
                <Label content={<CustomLabel value1={item.value} />}></Label>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span style={{ display: 'block', marginTop: 10 }}>{item.name}</span>
        </Col>
      ))}
    </Row>
  );
};
export default CircleStats;
