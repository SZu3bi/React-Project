import React, { useState,useEffect, useCallback } from "react";
import "./TotalSummaryCard.scss";
import {
  GetMainInfo_Contact,
  GetAmount_Contact,
} from "../../../Services/APIServices_2";
import { DeleteCredit, GetCredit } from "../../../Services/APIServices";
import { showError, showSuccess } from "../../../Helper/Tostify.Helper";
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const TotalSummaryCard = () => {
  const [result, setResult] = useState();
  const [amount, setamount] = useState(0);

  const GetAllData = useCallback(async () => {
    const result = await GetCredit();
    if (result) {
      const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
      setResult(sortedResult);
    } else setResult(null);
  }, []);

  console.log(result,'result');

  const TotalAmount = useCallback(async () => {
    const result = await GetAmount_Contact();
    if (result) {
      setamount(result);
    } else setResult(0);
  }, []);

  const handleDeleteButton = async (deletedId) => {
    const result = await DeleteCredit(deletedId);
    if (result) {
      // setTimeout(() => {
      //   setLoading(false);
      // }, 2000);
      showSuccess("Deleted Successfully");
      GetAllData();
    } else showError("Delete Failed");
  };


  useEffect(() => {
    TotalAmount();
    GetAllData();
  }, [GetAllData, TotalAmount]);


  return (
    <div className="card-wrappersummary">
      {/* <div className="Paymentsummary">
        <div className="totalsummaryPayment">Total Summary</div>

        {result &&
          result.map((s, index) => (
            <div className="tourPayment">
              <div className="tourDetailsPayment">
                <div className="tourlabel">-{s.Name}</div>

                <a
                  href={`https://api.whatsapp.com/send/?phone=${s.Phone}&text=Hi ${s.Name} From Psi Amman.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Send Whatsapp
                </a>
              </div>
              <div className="tourDetailsPayment">
                <div className="tourlabelinfo">- Jordan-Amman</div>
                <div className="tourlabelinfo">{s.Amount__c} AED</div>
              </div>
            </div>
          ))}

        <div className="totalpricePayment">
          <div className="tourDetailsPayment">
            <div className="totallabel">-Total Amount</div>

            <span className="price">{amount.data}</span>
          </div>
          <div className="tourDetailsPayment">
            <div className="totallabel">-Discount 20%</div>
            <span className="price">{amount.data * 0.2}</span>
          </div>
          <div className="tourDetailsPayment">
            <div className="finalpricelabel">-Total Amount After Discount</div>
            <div className="finalprice">{amount.data - amount.data * 0.2}</div>
          </div>
        </div>
      </div> */}

{result &&
          result.map((s, index) => (

<div class="cc">
  <div class="cc__front">
    <div class="cc__brand">
      <div class="cc__brand-logo">
        <span class="cc__logo-circle cc__logo-circle--left"></span>
        <span class="cc__logo-circle cc__logo-circle--right"></span>
      </div>
      <span class="cc__brand-text">Mastercard</span>
    </div>
    <div class="cc__number">
      <span class="cc__number-dot"></span>
      <span class="cc__number-dot"></span>
      {/* <span class="cc__digits">{s.Contact_Name__c}</span> */}
      <span class="cc__digits">{s.Name}</span>
    </div>
    <IconButton
                        className="button"
                        size="small"
                        color="inherit"
                      >
                        <DeleteForeverIcon
                          onClick={() => handleDeleteButton(s.Id)}
                        ></DeleteForeverIcon>
                      </IconButton>
    <div class="cc__balance-text">$ {s.Amount__c }</div>
  </div>

</div>
          ))}



    </div>
  );
};
