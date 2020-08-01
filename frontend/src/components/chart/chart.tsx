import React from 'react';
import { TimeSeries, Index } from 'pondjs';
import { Resizable, Charts, ChartContainer, ChartRow, YAxis, LineChart, styler } from 'react-timeseries-charts';
import data from './data';

class SimpleChart extends React.Component {
    render() {
        const series = new TimeSeries({
            name: 'hilo_rainfall',
            columns: ['index', 'precip'],
            points: data.values.map(([d, value]) => [Index.getIndexString('1h', new Date(d)), value]),
        });

        const style = styler([
            {
                key: 'precip',
                color: '#A5C8E1',
                selected: '#2CB1CF',
            },
        ]);

        /* const axisStyle = {
            label: { stroke: 'none', fill: '#8B7E7E', fontWeight: 300, fontSize: 12, font: '"Kongtext", monospace"' },
            values: { stroke: 'none', fill: '#8B7E7E', fontWeight: 100, fontSize: 11, font: '"Kongtext", monospace"' },
            ticks: { fill: 'none', stroke: '#C0C0C0' },
            axis: { fill: 'none', stroke: '#C0C0C0' },
        }; */
        const darkAxis = {
            label: {
                stroke: 'none',
                fill: '#AAA', // Default label color
                fontWeight: 300,
                fontSize: 14,
                font: '"Kongtext", monospace"',
            },
            values: {
                stroke: 'none',
                fill: '#888',
                fontWeight: 300,
                fontSize: 11,
                font: '"Kongtext", monospace"',
            },
            ticks: {
                fill: 'none',
                stroke: '#AAA',
                opacity: 0.2,
            },
            axis: {
                fill: 'none',
                stroke: '#AAA',
                opacity: 1,
            },
        };

        return (
            <Resizable>
                <ChartContainer timeRange={series.range()} timeAxisStyle={darkAxis}>
                    <ChartRow height="150">
                        <YAxis
                            id="rain"
                            label="Rainfall (inches/hr)"
                            min={0}
                            max={2}
                            format=".2f"
                            width="70"
                            type="linear"
                            style={darkAxis}
                        />
                        <Charts>
                            <LineChart
                                axis="rain"
                                style={style}
                                spacing={1}
                                columns={['precip']}
                                series={series}
                                minBarHeight={1}
                            />
                        </Charts>
                    </ChartRow>
                </ChartContainer>
            </Resizable>
        );
    }
}

export default SimpleChart;
