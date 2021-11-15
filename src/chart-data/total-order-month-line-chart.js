// ===========================|| DASHBOARD - TOTAL ORDER MONTH CHART ||=========================== //

const chartDatamonth = {
    type: 'line',
    height: 100,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Total Order'
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'series2',
            data: [45, 66, 41, 89, 25, 44, 9, 54]
        }
    ]
};

export default chartDatamonth;
