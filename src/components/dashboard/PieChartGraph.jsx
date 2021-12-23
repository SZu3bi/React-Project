import { useCallback, useEffect, useState } from 'react';
import {Pie} from 'react-chartjs-2'
import { GetMainInfo_Contact } from '../../Services/APIServices_2';


    export const PieChartGraph = () => {
        const [count, setcount] = useState();
        const [result, setResult] = useState();

        const GetAllData = useCallback(async () => {
   
            const result = await GetMainInfo_Contact();
            if (result) {

              const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
              setResult(sortedResult);
              setcount(result.data.length);
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
            labels:names,
            datasets: [
                {
                    label: "Contacts",
                    borderColor: ['rgba(255,206,86,0.2)'],

                    backgroundColor: poolColors(result && result.map((s) => (s.Name)).length) ,
                    data: datasetfill,
                    weight:0.5,
                    hoverOffset: 20
                },
                {  scaleOverride : true,
                    scaleSteps : 10,
                    scaleStepWidth : 1,
                    scaleStartValue : 0,
                    barShowStroke : false,
                    barStrokeWidth : 1,
                    showTooltips : true,
                    barValueSpacing : 4,
                    animation : true,
                    responsive : true,
                    maintainAspectRatio : true
                }
            ],
       
            // datasets: [
            //     {
            //         label: 'Sales',
            //         data: [30,2,33,1,6,35],
            //         borderColor: ['rgba(255,206,86,0.2)'],
            //         backgroundColor: ['rgba(232,99,132,1)',
            //         'rgba(232,211,6,1)',
            //         'rgba(54,162,235,1)',
            //         'rgba(255,159,64,1)',
            //         'rgba(153,102,255,1)',
            //     'red' ],
            //     backgroundColor: [fillcolor],
            //         pointBackgroundColor: 'rgba(255,206,86,0.2)',
            //         backgroundImage: 'lightblue url("https://www.chartjs.org/img/chartjs-logo.svgf") no-repeat fixed center'
            //     }
                
            // ]
        }

        const options = {
            plugins: {
                title: {
                    display: true,
                    text: 'Pie Chart',
                    color:'blue',
                    font: {
                        size:34
                    },
                    padding:{
                        top:30,
                        bottom:30
                    },
                    animation:{
                        animateScale: true
                    }
                }
            }
            
        }
    return (
        <div style={{  background:'rgb(255 252 252)' , borderRadius: '30px' ,width:'auto'}}>
           <Pie data={data} options={options} />
        </div>
    )
}

export default PieChartGraph
