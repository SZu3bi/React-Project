import React, { useState, useRef } from "react";
import "./PaymentMethodView.scss";
import { Button } from "@material-ui/core";
import { Inputs } from "../../../Componentes";

export const PaymentMethodView = () => {
  const [credit, setcredit] = useState({
    creditcard: false,
  });
  const [paypal, setpaypal] = useState({
    payPal: false,
  });

  const [creditlabel, setcreditlabel] = useState("");
  const [paypallabel, setpaypallabel] = useState("");

  const selectcredit = () => {
    setcreditlabel("Credit");
    setpaypallabel("");
    setcredit({ creditcard: !credit.creditcard });
    setpaypal({ payPal: false });
  };
  const selectpaypal = () => {
    setpaypallabel("Paypal");
    setcreditlabel("");
    setpaypal({ payPal: !paypal.payPal });
    setcredit({ creditcard: false });
  };

  let selectedCard = credit.creditcard ? "selectedbtns" : "unselectedbtns";

  let selectedPaypal = paypal.payPal ? "selectedbtns" : "unselectedbtns";

  return (
    <div className="users-card-wrapperpayment">
      <div className="cards-wrapperpayment">
        <div className="item-wrapperpayment">
          <p className="headertitle">
            Payment Method {credit.creditcard ? creditlabel : null}
            {paypal.payPal ? paypallabel : null}
          </p>
        </div>
        <div className="cards-headerpayment">
          <Button onClick={selectcredit} className={selectedCard}>
            <div>
              <div>
                <span className="mdi mdi-credit-card-outline mdi-36px" />
              </div>
              <div className="btnslabel">Credit/Debit card</div>
            </div>
          </Button>
          <Button onClick={selectpaypal} className={selectedPaypal}>
            <div>
              <div>
                <img className="paypalimg" src={paypallogo} alt="pic"></img>
              </div>
            </div>
          </Button>
        </div>
        <div className="cards-bodypayment">
          <div>
            <div className="textfieldlabel">Credit Card Number</div>
            <div className="textfield">
              <Inputs
                idRef="tripsSearchRef"
                variant="outlined"
                fieldClasses="inputs theme-solid"
              />
            </div>
          </div>
          <div>
            <div className="textfieldlabel textfieldlabel-top">
              Card holder name
            </div>
            <div className="textfield">
              <Inputs
                idRef="tripsSearchRef"
                variant="outlined"
                fieldClasses="inputs theme-solid"
              />
            </div>
          </div>
          <div className="textfieldlabelDate-cvv">
            <div>
              <div className="textfieldlabel textfieldlabel-top">Date</div>
              <div className="dateinputright">
                <Inputs
                  idRef="tripsSearchRef"
                  variant="outlined"
                  fieldClasses="inputs theme-solid"
                />
              </div>
            </div>
            <div>
              <div className="textfieldlabel textfieldlabel-top">CV</div>
              <div>
                <Inputs
                  idRef="tripsSearchRef"
                  variant="outlined"
                  fieldClasses="inputs theme-solid"
                />
              </div>
            </div>
          </div>
          <div className="continuepaymentdiv">
            <Button className="continuepayment">Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
