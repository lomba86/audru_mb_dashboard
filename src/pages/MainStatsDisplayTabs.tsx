import React, { useState } from 'react';
import { Card } from 'antd';
import MainStatsDisplayPark from './MainStatsDisplayPark';

const MainStatsDisplayTabs = () => {
  const tabs = [
    {
      icon: '/icons/icon-park.svg',
      name: 'Parque',
      value: '',
      id: 'park',
    },
    {
      icon: '/icons/icon-potential.svg',
      name: 'Potencial',
      value: '',
      id: 'potential',
    },
    {
      icon: '/icons/icon-wrench.svg',
      name: 'Ord. Reparación',
      value: '',
      id: 'rep-orders',
    },
    {
      icon: '/icons/icon-download.svg',
      name: 'Capacidad',
      value: '',
      id: 'capacity',
    },
    {
      icon: '/icons/icon-wrench-potential.svg',
      name: 'Ordenes de Reparación',
      value: '',
      id: 'rep-orders-potential',
    },
    {
      icon: '/icons/icon-wrench-download.svg',
      name: 'Ordenes de Reparación',
      value: '',
      id: 'rep-orders-capacity',
    },
  ];

  const [activeTab] = useState(tabs[0].id);

  return (
    <Card
      className="main-stats"
      title={
        <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tabs__item tabs__item--${tab.id} ${
                tab.id === activeTab ? 'tabs__item--active' : ''
              }`}
              // onClick={() => setActiveTab(tab.id)}
            >
              <img src={tab.icon} alt="" className="tabs__item-icon" />
              <span className="tabs__item-label">{tab.name}</span>
              <span className="tabs__item-subtext">&nbsp;</span>
            </div>
          ))}
        </div>
      }
    >
      <MainStatsDisplayPark />
    </Card>
  );
};
export default MainStatsDisplayTabs;
