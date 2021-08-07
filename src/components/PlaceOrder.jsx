import React from "react";

const PlaceOrder = (props) => {
  const rows = props.cartItems.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.price}</td>
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
          </tr>
        </thead>

        <tbody>
           {rows}
        </tbody>

         {tableFooter}
      </table>

      <button className="btn btn-primary btn-info" onClick={() => {props.placeOrder();}}>
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;
