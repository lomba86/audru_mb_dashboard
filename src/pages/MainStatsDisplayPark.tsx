import React from 'react';
import { Row, Col } from 'antd';
import StatsCard from '../components/StatsCard';
import SegmentsStats from '../components/SegmentsStats';
import LocationUnitStats from '../components/LocationUnitStats';
import InteractiveMap from '../components/InteractiveMap';
import AccountStats from '../components/AccountStats';
import ModelStats from '../components/ModelStats';

const MainStatsDisplayPark = () => {
  return (
    <Row gutter={10}>
      <Col md={12}>
        <StatsCard
          title="REGIONAL"
          description="Visualización por Zona, Provincias y Departamentos"
        >
          <InteractiveMap />
        </StatsCard>
        <StatsCard title="MODELOS" description="">
          <ModelStats />
        </StatsCard>
      </Col>
      <Col md={12}>
        <StatsCard title="SEGMENTOS" description="">
          <SegmentsStats />
        </StatsCard>
        <StatsCard title="CUENTAS" description="">
          <AccountStats />
        </StatsCard>
        <StatsCard title="DISTRITOS" description="">
          <LocationUnitStats />
        </StatsCard>

        {/* <StatsCard title="Otros Gráficos" description="">
          <BarStats />
        </StatsCard> */}
      </Col>
    </Row>
  );
};
export default MainStatsDisplayPark;
