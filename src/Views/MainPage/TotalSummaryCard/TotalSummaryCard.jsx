import React, { useState, useRef, useEffect, useCallback } from "react";
import "./TotalSummaryCard.scss";
import {
  GetMainInfo_Contact,
  GetAmount_Contact,
} from "../../../Services/APIServices_2";

export const TotalSummaryCard = () => {
  const [result, setResult] = useState();
  const [amount, setamount] = useState(0);

  const GetAllData = useCallback(async () => {
    const result = await GetMainInfo_Contact();
    if (result) {
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);
      console.log("item ", result);
    } else setResult(null);
  }, []);

  const TotalAmount = useCallback(async () => {
    const result = await GetAmount_Contact();
    if (result) {
      setamount(result);
      console.log("Result ", result);
    } else setResult(0);
  }, []);

  useEffect(() => {
    TotalAmount();
    GetAllData();
  }, [GetAllData, TotalAmount]);
  return (
    <div className="card-wrappersummary">
      <div className="Paymentsummary">
        <div className="totalsummaryPayment">Total Summary</div>

        {/* tour details */}
        {result &&
          result.map((s, index) => (
            <div className="tourPayment">
              <div className="tourDetailsPayment">
                <div className="tourlabel">-{s.Name}</div>
                {/* <span className="showdetail">Show Details</span> */}

                <a href={`https://api.whatsapp.com/send/?phone=${s.Phone}&text=Hi ${s.Name} From Psi Amman.`} target="_blank">Send Whatsapp</a>
              </div>
              <div className="tourDetailsPayment">
                <div className="tourlabelinfo">- Jordan-Amman</div>
                <div className="tourlabelinfo">{s.Amount__c} AED</div>
              </div>
            </div>
          ))}

        {/* TotalPriceDiv */}
        <div className="totalpricePayment">
          <div className="tourDetailsPayment">
            <div className="totallabel">-Total Amount</div>
            
            <span className="price">{amount.data}</span>
          </div>
          <div className="tourDetailsPayment">
            <div className="totallabel">-Discount 20%</div>
            <span className="price">{amount.data * 0.20}</span>
          </div>
          <div className="tourDetailsPayment">
            <div className="finalpricelabel">-Total Amount After Discount</div>
            <div  className="finalprice">{amount.data - (amount.data * 0.20) }</div>
          </div>
        </div>
      </div>
    </div>
  );
};
