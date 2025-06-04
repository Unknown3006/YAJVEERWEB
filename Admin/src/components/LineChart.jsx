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
                    curve="linear"  // Changed to linear for stock-like appearance
                    enablePoints={true}  // Enable points
                    pointSize={4}  // Small point size
                    pointBorderWidth={2}
                    pointBorderColor="#22c55e"
                    pointColor="white"
                    enableSlices="x"
                    sliceTooltip={({ slice }) => (
                        <div
                            style={{
                                background: 'white',
                                padding: '9px 12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        >
                            <div style={{color: '#333', fontSize: '14px', fontWeight: 'bold'}}>
                                {slice.points[0].data.x}
                            </div>
                            <div style={{color: '#22c55e'}}>
                                Value: {slice.points[0].data.y}
                            </div>
                        </div>
                    )}
                    crosshairType="x"  // Only show vertical crosshair
                    enableGridX={false}  // Disable vertical grid
                    enableGridY={true}
                    gridYValues={5}  // Show fewer horizontal grid lines
                    lineWidth={2}  // Thinner line for stock-like appearance
                    enableArea={true}
                    areaOpacity={0.1}  // More subtle area fill
                    colors={['#22c55e']}
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
                />
            </div>
        </div>
    );
};

export default LineChart;