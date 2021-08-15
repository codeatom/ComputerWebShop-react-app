import React from "react";

const CartItemsTable = (props) => {
  const rows = props.cartItems.map((item, index) => {
    return (
      <tr key={"cartItem" + index}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>
          <button className="btn bg-transparent" style={{color: '#cc0000'}} onClick={() => {props.removeCartItem(item.id);}}>
            |Remove|
          </button>
        </td>
      </tr>
    );
  });

  const tableFooter = 
    <tfoot className="text-right">
      <tr>
        <td className="text-right font-weight-bold">Total</td>
        <td className="text-right font-weight-bold">{props.itemsTotalCost}</td>
      </tr>
    </tfoot>


  return (  
    <div>

      <h3>Cart Items</h3>
       <hr></hr>
       <br></br>

      <table className="table table-striped table-bordered">        
        <thead className="thead-dark">
          <tr>
            <th>Computer</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
           {rows}
        </tbody>

         {tableFooter}
      </table>

      <button className="btn btn-primary btn-info" onClick={() => {props.checkOut();}}>
        Checkout
      </button>
    </div>
  );
};

export default CartItemsTable;
