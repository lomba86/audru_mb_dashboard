import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';

interface StatsCardProps {
  title: string;
  description: string;
}

const StatsCard: React.FunctionComponent<StatsCardProps> = ({
  children,
  title,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getTitle = (params: { title: string; description: string }) => {
    const { title, description } = params;
    return (
      <>
        <span className="stats-card__title">{title}</span>
        <span className="stats-card__description">{description}</span>
      </>
    );
  };

  return (
    <>
      <Card
        className="stats-card"
        title={getTitle({ title, description })}
        extra={<FullscreenOutlined onClick={toggleExpanded} />}
      >
        {children}
      </Card>
      {isExpanded && (
        <Modal
          title={getTitle({ title, description })}
          visible={true}
          footer={null}
          onCancel={toggleExpanded}
          width={'70vw'}
          style={{ top: 20 }}
        >
          {children}
        </Modal>
      )}
    </>
  );
};
export default StatsCard;
