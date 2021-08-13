import React from "react";

const Receipt = (props) => {
  const rows = props.orderedItems.map((item, index) => {
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
