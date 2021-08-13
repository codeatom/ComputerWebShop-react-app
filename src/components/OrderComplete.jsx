import React from "react";


const OrderComplete = (props) => {
    return (   
        <div>

           <br></br>
           <br></br>
           <br></br>         
           
           <button className="btn bg-transparent" style={{color: '#006600'}} onClick={() => {props.showReceipt();}}>
              <h6>Get your receipt</h6>    
            </button>

        </div>
      );
};

export default OrderComplete;
