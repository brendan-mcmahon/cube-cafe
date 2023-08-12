import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, PieLabelRenderProps  } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel: React.FC<PieLabelRenderProps> = (props) => {
  if (!props.innerRadius || !props.outerRadius || !props.cx || !props.cy || !props.midAngle) return null;

  const innerRadius = Number(props.innerRadius);
  const outerRadius = Number(props.outerRadius);
  const cx = Number(props.cx);
  const cy = Number(props.cy);
  const midAngle = Number(props.midAngle);
  const percent = Number(props.percent);

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function _PieChart(props: { data: any[]; }) {
  return <div className="pie-chart" style={{ width: '100%', height: 250 }}>
    <ResponsiveContainer>
      <PieChart width={200} height={200}>
        <Pie
          data={props.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>;
}
