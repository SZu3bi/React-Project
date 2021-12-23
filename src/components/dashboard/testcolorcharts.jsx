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

          console.log(result && result.map((s) => (s.Name)),'res');

          useEffect(() => {
            GetAllData();
         
          }, [GetAllData ]);

          const names =['salah','hasan','Zaid','Baraa','Omar','malek'];

          const randomColorGenerator =  () =>{ 
            return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
        };
        const getRandomColor =() => {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
               color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
         }

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
                    label: "My First dataset",
                    borderColor: ['rgba(255,206,86,0.2)'],

                    backgroundColor: poolColors(names.length),
                    data: [ 59, 80, 81, 56, 55, 40]
                }
            ]
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
        <div style={{  background:'rgb(255 252 252)' ,     borderRadius: '100px'}}>
           <Pie data={data} options={options} />
        </div>
    )
}

export default PieChartGraph
