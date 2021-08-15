import React from "react";

const Receipt = (props) => {
  const rows = props.order.map((order, index) => {
    return (
      <tr key={index + order.id}>
        <td>{order.computer.name}</td>
        <td>{order.amount}</td>
        <td>{order.price * order.amount}</td>
      </tr>
    );
  });


  let totalCost = 0;
  for(let i = 0; i<props.order.length; i++){
    totalCost = totalCost + Number(props.order[i].price * props.order[i].amount);
  }


  const tableFooter = 
    <tfoot>
      <tr>
        <td className="text-right font-weight-bold"></td>
        <td className="text-right font-weight-bold">Total Cost</td>
        <td className="text-right font-weight-bold">{totalCost}</td>
      </tr>
    </tfoot>


  let extraText = <div>
                      <p>Please keep your receipt safe.</p>
                      <p>For return and refund, please see our return and refund policy at</p>
                      <p>https://returnandrefund/policy/corecomputers.com/#/</p>
                  </div>


  return (  
    <div>

        <br></br>
        <h5>Purchase receipt</h5>
        <br></br>
         
        <table className="table table-striped">        
        <thead>
          <tr>
            <th>Computer</th>
            <th>Quantity</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>
           {rows}
        </tbody>

         {tableFooter}
      </table>

      <br></br>
      <br></br>

      {extraText}
    </div>
  );
};

export default Receipt;
