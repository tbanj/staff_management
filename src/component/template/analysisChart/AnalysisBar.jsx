import React, { Component } from 'react';
import { Chart } from "react-google-charts";
class AnalysisBar extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div style={{ display: 'flex', maxWidth: 900 }}>
                    <Chart
                        width="100%"
                        height={400}
                        chartType="ColumnChart"
                        features="Maximize"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['City', 'Approved', 'Pending'],
                            ['Acc', 2792000, 3000000],
                            ['HR', 3100000, 2892000],
                            ['Finance', 2994000, 3200000],
                            ['Media', 3499000, 3210000],
                        ]}
                        options={{

                            chartArea: { width: '75%' },
                            hAxis: {
                                minValue: 0,
                                label: 'auto',
                                display: 'none'
                            },
                            vAxis: {
                                color: '#FFFFFF',
                                textStyle: { color: '#FFF' },
                                gridlines: { color: 'none' }



                            },
                            legend: 'bottom',
                            colors: ['#E1EAF5', '#82B1ED'],

                        }}
                        legendToggle
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default AnalysisBar;