import React, { useContext, useState } from 'react';
import { Table, Button } from 'antd';
import { sortBy } from 'lodash';
import { extrapolatePercentages } from '../shared/extrapolatePercentages';
import { addPercentageColors } from '../shared/addPercentageColors';
import ParkStatsContext from '../shared/ParkStatsContext';
import { useAccounts } from '../hooks/accounts';

const AccountStats = () => {
  const { accounts: accountsData } = useContext(ParkStatsContext);
  const { accounts } = useAccounts();
  const [showAll, setShowAll] = useState(false);

  const parsedData = accountsData.map((accountDataPoint) => {
    const account = accounts.find(
      (acc) => acc.id === accountDataPoint.accountId
    );

    return {
      id: accountDataPoint.accountId,
      value: parseInt(accountDataPoint.count),
      name: account ? account.name : '',
    };
  });

  const dataWithPercentage = extrapolatePercentages(parsedData);
  let data = addPercentageColors(dataWithPercentage);
  data = [...sortBy(data, 'value')].reverse();

  if (!showAll) {
    data = data.slice(0, 10);
  }

  const columns = [
    {
      title: 'Cuenta',
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
      render: (value: number) => Math.trunc(value),
    },
  ];

  return (
    <>
      <Table
        className="compact-table"
        pagination={false}
        dataSource={data}
        columns={columns}
        rowKey="id"
      />
      <div style={{ textAlign: 'right', marginTop: 5 }}>
        <Button size="small" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Mostrar menos' : 'Mostrar todos'}
        </Button>
      </div>
    </>
  );
};
export default AccountStats;
