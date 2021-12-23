import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { GetMainInfo_Contact } from '../../Services/APIServices_2';
import { useCallback, useEffect, useState } from 'react';

export const Sales = (props) => {
  const theme = useTheme();

  const [result, setResult] = useState();

  const GetAllData = useCallback(async () => {

      const result = await GetMainInfo_Contact();
      if (result) {

        const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
        setResult(sortedResult);
        console.log('Contact',result);
      } else setResult(null);
      // setcount(0);
  
    }, []);
    const [state, setState] = useState({
      name : '',
      fill: 0,
  }
  )
    console.log(result && result.map((s) => (s.Name)),'res');
    console.log(result,'res-1');

    useEffect(() => {
      GetAllData();
   
    }, [GetAllData ]);

    const names =result && result.map((s) => (s.Name));
    const datasetfill =result && result.map((s) => (s.Amount__c));

   const dynamicColors =()=> {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgba(" + r + "," + g + "," + b + ", 0.5)";
  }
 const poolColors = (a) => {
      var pool = [];
      for(var i = 0; i < a; i++) {
          pool.push(dynamicColors());
      }
      return pool;
  }
  

  const data = {
    datasets: [
      {
        backgroundColor:poolColors(result && result.map((s) => (s.Name)).length),
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: datasetfill,
      
        maxBarThickness: 10
      },
      // {
      //   backgroundColor: '#EEEEEE',
      //   barPercentage: 0.5,
      //   barThickness: 12,
      //   borderRadius: 4,
      //   categoryPercentage: 0.5,
      //   data: [11, 20, 12, 29, 30, 25, 13],
      //   label: 'Last year',
      //   maxBarThickness: 10
      // }
    ],
    labels: names
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        // action={(
        //   <Button
        //     endIcon={<ArrowDropDownIcon fontSize="small" />}
        //     size="small"
        //   >
        //     Last 7 days
        //   </Button>
        // )}
        title="Amount"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button> */}
      </Box>
    </Card>
  );
};
