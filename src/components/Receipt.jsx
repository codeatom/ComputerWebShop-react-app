import React from "react";

const Receipt = (props) => {
  const rows = props.orderedItems.map((item) => {
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
      

        <tbody>
           {rows}
        </tbody>

         {tableFooter}
      </table>
    </div>
  );
};

export default Receipt;
