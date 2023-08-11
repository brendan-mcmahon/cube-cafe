import React, { useEffect } from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';

type ChartProps = {
    data: any[],
    xAxisKey: string,
    xAxisLabel: string | null,
    yAxisLabel: string | null
}

export default function _BarChart(props: ChartProps) {
    return (
        <div className="bar-chart" style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
                <BarChart
                    data={props.data}
                    margin={{ top: 5, right: 50, left: 30, bottom: 5 }}
                >
                    <XAxis dataKey={props.xAxisKey}>
                        <Label value={props.xAxisLabel || ""} offset={-5} position="insideBottom" />
                    </XAxis>
                    {/* <YAxis label={{ value: props.yAxisLabel || "", angle: -90, offset: 10, position: 'insideLeft' }} /> */}
                    <YAxis />
                    <Bar dataKey="averageActionCount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
}
