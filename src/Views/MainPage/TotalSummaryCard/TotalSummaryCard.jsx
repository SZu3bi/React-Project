import React , {useState , useRef} from 'react';
import './TotalSummaryCard.scss'


export const TotalSummaryCard = ()=>{

return(
    <div className="card-wrappersummary" >

<div className="Paymentsummary">
<div className="totalsummaryPayment">Total Summary</div>

{/* tour details */}
<div className="tourPayment">
    <div className="tourDetailsPayment">
<div className="tourlabel">-Tour 1</div>
<span className="showdetail">Show Details</span>
    </div>
    <div className="tourDetailsPayment">
<div className="tourlabelinfo">- Burj khaleefa Dubai</div>
<div  className="tourlabelinfo">500 AED</div>
    </div>

</div>


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