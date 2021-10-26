import React , {useState , useRef} from 'react';

import './PaymentCard.scss'
import { Button } from '@material-ui/core';
import paypal from '../../../Assets/Images/paypal.png'
import { Inputs } from '../../../Componentes';

export const PaymentCard = ()=>{
    let textInput = React.useRef(); 


    const onOnclickHandler = () => {
        console.log(textInput.current.value); 
      };

      
const [state , setstate]=useState({
black:false,
value:1
  });
const [State , setState]=useState({
btn:false
  });

  
 let btn_class = state.black ? "blackButton" : "whiteButton";

 let btn_class2 = State.btn ? "blackButton" : "whiteButton";


  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectednumber, setSelectednumber] = useState('');

  const selectNumber = () => {
    setSelectedNumber('Credit');
    setSelectednumber('');
    setstate({black: !state.black})
    setState({btn:false})
    

   
}
  const selectnumber = () => {
    setSelectednumber('Paypal');
    setSelectedNumber('');

    setState({btn: !State.btn})
    setstate({black:false})
 
   
}


// const  changeColor = (e) =>{
//     setstate({black: !state.black})
//     setState({btn:false})
//     console.log("value", e.target.value);
//  } 
// const  changeColor2 = () =>{
//     setState({btn: !State.btn})
//     setstate({black:false})

//  } 




 const [inputs, setInputs] = useState({
     salah:"",
    name: "",
    email: ""
  })

  const changeHandle = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const submitHandle = e => {
    e.preventDefault()
    console.log(inputs)
  }


  const [fields, setFields] = useState([{ value: null }]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }



    return(

        <div className="mainDivPayment" >

        <div className="users-card-wrapperpayment" >
              
                <div className="cards-wrapperpayment">
                <div className="item-wrapperpayment">
            <p style={{fontWeight: 'bold'}}>Payment Method {state.black ? selectedNumber : null}{State.btn ?selectednumber:null}</p> 
         

        </div>
{/* 
<div className="labeladd">
        <h1>Add field</h1>
        <button  type="button" onClick={() => handleAdd()}>
  +
</button>
</div>
<div className="add">


{fields.map((field, idx) => {
  return (
    <div key={`${field}-${idx}`}>
      <input
        type="text"
        placeholder="Enter text"
        onChange={e => handleChange(idx, e)}
      />
      <button type="button" onClick={() => handleRemove(idx)}>
        X
      </button>
    </div>
  );
})}
</div>

     <div className="input">
      <input type="text" name="name" value={inputs.name} onChange={changeHandle} />
      <input type="email" name="email" value={inputs.email} onChange={changeHandle} />
      <button onClick={submitHandle}>Submit</button>
      <input ref={textInput} type="text" />
      <button onClick={onOnclickHandler}>Show text</button>
 
      </div> */}

  
        <div className="cards-headerpayment" >
    
        <Button
        style={{margin:'2%'}}
         onClick={selectNumber}
         className={btn_class}
        //className="btnsPayment theme-outline"
     
        >
            <div>
            <div>
            <span className="mdi mdi-credit-card-outline mdi-36px" />

            </div>
            <div className="btnslabel">
            Credit/Debit card

            </div>
            </div>
    </Button>
    <Button
            style={{margin:'2%'}}

        //className="btnsPayment theme-outline"
        onClick={selectnumber}
        className={btn_class2}
        >

<div>
            <div>
            <img  style={{    width: '65px'}} src={paypal} alt="pic"></img>

            </div>
          
            </div>
    
    </Button>
            </div>
          
                
            <div className="cards-bodypayment"  >
<div>
<div style={{margin: '1%'}}>Credit Card Number</div>
                <div className="textfield">


                <Inputs
                idRef="tripsSearchRef"
                variant="outlined"
                fieldClasses="inputs theme-solid"/>
                </div>
                </div>
<div>
<div style={{margin: '1%'}}>Card holder name</div>
                <div className="textfield">
                <Inputs
                idRef="tripsSearchRef"
                variant="outlined"
            
                fieldClasses="inputs theme-solid"/>
                </div>
                </div>
<div style={{display: 'flex',
    justifyContent: 'space-between'}}>
    <div>
<div style={{margin: '1%'}}>Date</div>
                <div >
                <Inputs
                idRef="tripsSearchRef"
                variant="outlined"
            
                fieldClasses="inputs theme-solid"/>
                </div>

                </div>
                <div>
                <div style={{margin: '1%'}}>CV</div>
                <div >
                <Inputs
                idRef="tripsSearchRef"
                variant="outlined"
            
                fieldClasses="inputs theme-solid"/>
                </div>
                </div>
                </div>
        

        <div style={{display:'flex',justifyContent:'center',marginTop:'4%'}} >
        <Button

       
                className="btnspayment">Continue
        
            </Button>
        </div>
     

        </div>
     
    
              

      
            </div>
            </div>

<div className="secDivPayment">
<div className="totalsummaryPayment">Total Summary</div>
<div className="tourPayment">
    <div className="tourDetailsPayment">
<div style={{    fontSize: 'medium',fontWeight: '700',color: 'black'}}>Tour 1</div>
<div  style={{fontSize: 'smaller',color: 'orange'}}>Show Details</div>
    </div>
    <div className="tourDetailsPayment">
<div style={{color: 'black'}}>- Burj khaleefa Dubai</div>
<div  style={{fontSize: 'smaller',color: 'black'}}>500 AED</div>
    </div>

</div>
<div className="totalpricePayment">
    <div className="tourDetailsPayment">
<div style={{    fontSize: 'medium',
fontWeight: '700',
color: 'black'}}>Total</div>
<div style={{color: 'black' }} >1400 AED</div>

    </div>
    <div className="tourDetailsPayment">
<div style={{color: 'black'}}>Discount 20%</div>
<div  style={{fontSize: 'smaller'
,color: 'black'}}>-100 AED</div>

    </div>
    <div className="tourDetailsPayment">
<div style={{fontSize: 'smaller'
,color: 'orange'}}>Total Price</div>
<div  style={{fontSize: 'large'
,color: 'orange',fontWeight:'600'}}>1100 AED</div>

    </div>

</div>
<div className="actionbtnPayment">

</div>
</div>

</div>
    )
}