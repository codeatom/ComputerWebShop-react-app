import React from "react";

const OrderHistory = (props) => {
  const rows = props.order.map((order, index) => {
    return (
      <tr key={index + order.id}>
        <td>{order.computer.name}</td>
        <td>{order.amount}</td>
        <td>{order.price}</td>
        <td>{order.price * order.amount}</td>
      </tr>
    );
  });


  let totalCost = 0;
  for(let i = 0; i<props.order.length; i++){
    totalCost = totalCost + Number(props.order[i].price * props.order[i].amount);
  }


  const tableHead = 
    <thead className="thead-dark">
      <tr>
          <th>Computer</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Subtotal</th>
      </tr>
    </thead>


  const tableFooter = 
    <tfoot>
      <tr>
        <td className="text-right font-weight-bold"></td>
        <td className="text-right font-weight-bold"></td>
        <td className="text-right font-weight-bold">Grand Total</td>
        <td className="text-right font-weight-bold">{totalCost}</td>
      </tr>
    </tfoot>


  return (  
    <div>

        <br></br>                        
         <h5>Your order</h5>
        <br></br>

        <table className="table table-striped table-bordered">        
          {tableHead}
          <tbody>
             {rows}
          </tbody>
          {tableFooter}
        </table>

        <br></br>
        <br></br>
        
        <button className="btn bg-transparent" style={{color: '#006600'}} onClick={() => {props.showReceipt();}}>
          <h6>Get receipt</h6>    
        </button>

    </div>
  );
};

export default OrderHistory;
