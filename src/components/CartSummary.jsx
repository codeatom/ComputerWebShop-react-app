import React from "react";


const CartSummary = (props) => {

  var divStyle = {
    fontStyle: "italic",
    color: "#ffffff",
  };

  let cart = 
         <button className="btn bg-transparent" style={divStyle} onClick={() => {props.showCartItems();}}>
             <h5 >Cart&nbsp;{props.cartItemsList.length}</h5>     
         </button>

     
  return (
    <div>
      {cart}
    </div>
  );
};

export default CartSummary;
