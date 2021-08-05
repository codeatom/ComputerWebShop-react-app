import React from "react";


const CartSummary = (props) => {

  var divStyle = {
    marginLeft: "400px",
    fontStyle: "italic",
    color: "#006600",
  };

  let cart = 
         <button class="btn bg-transparent" style={divStyle} onClick={() => {props.showCartItems();}}>
             <h5>Cart_{props.cartItemsList.length}</h5>     
         </button>

     
  return (
    <div className="col-md-1" >
      {cart}
    </div>
  );
};

export default CartSummary;
