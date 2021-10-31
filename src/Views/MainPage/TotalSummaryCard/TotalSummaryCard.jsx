import React , {useState , useRef,useEffect,useCallback} from 'react';
import './TotalSummaryCard.scss'
import { GetMainInfo_Contact } from '../../../Services/APIServices_2';


export const TotalSummaryCard = ()=>{

    const [result, setResult] = useState();

    const GetAllData = useCallback(async () => {
        const result = await GetMainInfo_Contact();
        if (result) {
          const sortedResult = result.data.sort((a, b) =>
            a.Id.localeCompare(b.Id)
          );
          setResult(sortedResult);
          console.log('item ', result);
        } else setResult(null);
      }, []);
      

      useEffect(() => {
     GetAllData();
        }, [GetAllData]);
return(
    <div className="card-wrappersummary" >

<div className="Paymentsummary">
<div className="totalsummaryPayment">Total Summary</div>

{/* tour details */}
{result && result.map((s ,index ) => ( 
<div className="tourPayment">
    <div className="tourDetailsPayment">
<div className="tourlabel">-{s.Name}</div>
<span className="showdetail">Show Details</span>
    </div>
    <div className="tourDetailsPayment">
<div className="tourlabelinfo">- Burj khaleefa Dubai</div>
<div  className="tourlabelinfo">{s.Amount__c} AED</div>
    </div>

</div>
))}

{/* TotalPriceDiv */}
<div className="totalpricePayment">
    <div className="tourDetailsPayment">
<div className="totallabel">-Total</div>
<span className="price">1400 AED</span>
    </div>
    <div className="tourDetailsPayment">
<div className="totallabel">-Discount 20%</div>
<span className="price">-100 AED</span>

    </div>
    <div className="tourDetailsPayment">
<div className="finalpricelabel">-Total Price</div>
<div  className="finalprice">1100 AED</div>

    </div>

</div>
</div>
</div>
)
    
}