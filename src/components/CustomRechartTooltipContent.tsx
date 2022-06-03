// recharts doesn't export the default tooltip,
// but it's located in the package lib so you can get to it anyways
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';
import React from 'react';

const CustomRechartTooltipContent = (props) => {
  if (!props.active) {
    return null;
  }
  const { payload } = props;

  const newPayload = [
    {
      name: payload[0].payload.name,
      value: `${payload[0].payload.percentageStr}% | ${payload[0].payload.value} unidades`,
    },
  ];

  // we render the default, but with our overridden payload
  return <DefaultTooltipContent {...props} payload={newPayload} />;
};

export default CustomRechartTooltipContent;
