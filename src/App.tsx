import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import './styles/index.scss';
import 'leaflet/dist/leaflet.css';

import ZonesPage from './pages/ZonesPage';
import { Layout } from 'antd';

const App: React.FC = () => {
  const { Content, Sider } = Layout;

  return (
    <Layout>
      <Sider>Sider</Sider>
      <Content>
        <ZonesPage />
      </Content>
    </Layout>
  );
};

export default App;
