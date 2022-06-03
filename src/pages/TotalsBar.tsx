import React, { useContext } from 'react';
import { Row, Col, Card } from 'antd';
import ParkStatsContext from '../shared/ParkStatsContext';

const TotalsBar = () => {
  const { totals } = useContext(ParkStatsContext);

  return (
    <Card
      style={{ backgroundColor: '#f1f5f8' }}
      bordered={false}
      bodyStyle={{ padding: 15 }}
    >
      <Row style={{ textAlign: 'center' }}>
        <Col md={8}>
          <div className="total-result total-result--car">
            <img
              src="/icons/icon-car.svg"
              alt=""
              className="total-result__icon"
            />
            <span className="total-result__label">Puntos de posventa</span>
            <span className="total-result__data">
              <span className="total-result__subtext">Encontrados:</span>{' '}
              <span className="total-result__number">{totals.ppCount}</span>
            </span>
          </div>
        </Col>
        <Col md={8}>
          <div className="total-result total-result--mercedes-gear">
            <img
              src="/icons/icon-mercedes-gear.svg"
              alt=""
              className="total-result__icon"
            />
            <span className="total-result__label">Unidades</span>
            <span className="total-result__data">
              <span className="total-result__subtext">Cantidad:</span>{' '}
              <span className="total-result__number">{totals.unitCount}</span>
            </span>
          </div>
        </Col>
        <Col md={8}>
          <div className="total-result total-result--world">
            <img
              src="/icons/icon-world.svg"
              alt=""
              className="total-result__icon"
            />
            <span className="total-result__label">Km cuadrados</span>
            <span className="total-result__data">
              <span className="total-result__number">{totals.km2}</span>{' '}
              <span className="total-result__subtext">KM2</span>
            </span>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
export default TotalsBar;
