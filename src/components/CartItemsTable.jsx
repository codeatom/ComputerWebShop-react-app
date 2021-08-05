import React from "react";

const CartItemsTable = (props) => {
  const rows = props.cartItems.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <button class="btn bg-transparent" style={{color: '#cc0000'}} onClick={() => {props.removeCartItem(item.id);}}>
          |Remove|
        </button>
      </tr>
    );
  });

  const tableFooter = 
    <tfoot class="text-right">
      <tr>
        <td class="text-right font-weight-bold">Total</td>
        <td class="text-right font-weight-bold">{props.itemsTotalCost}</td>
      </tr>
    </tfoot>


  return (  
    <div className="col-md-7" >

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
