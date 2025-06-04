import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import '../CSS/LineChart.css';

const LineChart = ({ data, title }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <div className="chart-container">
            <h3 className="chart-title">{title}</h3>
            <div className="chart-wrapper">
                <ResponsiveLine
                    data={[data]}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: '#22c55e',
                                    strokeWidth: 2
                                }
                            },
                            legend: {
                                text: {
                                    fill: '#333',
                                    fontSize: 14,
                                    fontWeight: 600
                                }
                            },
                            ticks: {
                                line: {
                                    stroke: '#22c55e',
                                    strokeWidth: 1
                                },
                                text: {
                                    fill: '#666',
                                    fontSize: 12,
                                    fontWeight: 500
                                }
                            }
                        },
                        grid: {
                            line: {
                                stroke: '#eee',
                                strokeWidth: 1
                            }
                        },
                        legends: {
                            text: {
                                fill: '#333',
                                fontSize: 12,
                                fontWeight: 500
                            }
                        },
                        tooltip: {
                            container: {
                                background: '#fff',
                                fontSize: 12,
                                borderRadius: '6px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                padding: '8px 12px'
                            }
                        }
                    }}
                    margin={{ top: 40, right: 110, bottom: 60, left: 70 }}
                    xScale={{ type: 'point' }}
                    yScale={{ 
                        type: 'linear', 
                        min: 'auto', 
                        max: 'auto', 
                        stacked: false, 
                        reverse: false 
                    }}
                    curve="stepBefore"  // Changed to step style
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 8,
                        tickRotation: 0,
                        legend: 'MONTH',
                        legendOffset: 45,
                        legendPosition: 'middle',
                        legendStyle: {
                            fontWeight: 700,
                            fontSize: 14
                        }
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 8,
                        tickRotation: 0,
                        legend: 'COUNT',
                        legendOffset: -55,
                        legendPosition: 'middle',
                        legendStyle: {
                            fontWeight: 700,
                            fontSize: 14
                        }
                    }}
                    enablePoints={false}
                    enableGridX={true}
                    enableGridY={true}
                    lineWidth={3}
                    enableArea={true}
                    areaOpacity={0.15}
                    colors={['#22c55e']}
                    enableSlices="x"
                    crosshairType="cross"
                />
            </div>
        </div>
    );
};

export default LineChart;