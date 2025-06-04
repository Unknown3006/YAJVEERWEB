import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
const LineChart = ({ data, title }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <div className="chart-container">
            <h3 style={{ 
                textAlign: 'center', 
                color: colors.grey[100],
                marginBottom: '20px'
            }}>{title}</h3>
            <div style={{ height: '300px' }}>
                <ResponsiveLine
                    data={[data]}
                    theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[100]
                            }
                        },
                        legend: {
                            text: {
                                fill: colors.grey[100]
                            }
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1
                            },
                            text: {
                                fill: colors.grey[100]
                            }
                        }
                    },
                    legends: {
                        text: {
                            fill: colors.grey[100]
                        }
                    }
                }}
                margin={{ top: 30, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ 
                    type: 'linear', 
                    min: 'auto', 
                    max: 'auto', 
                    stacked: false, 
                    reverse: false 
                }}
                curve="cardinal"
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                enableGridX={false}
                enableGridY={false}
                pointSize={8}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'seriesColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                />
            </div>
        </div>
    );
};

export default LineChart;