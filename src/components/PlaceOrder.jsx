import React from "react";

const PlaceOrder = (props) => {
  const rows = props.cartItems.map((item, index) => {
    return (
      <tr key={index + item.id}>
        <td>{item.name}</td>
        <td>{item.price}</td>
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
       <h3>Complete your order</h3>
       <hr></hr>
       <br></br>

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
