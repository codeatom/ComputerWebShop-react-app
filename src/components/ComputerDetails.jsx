import React from "react";


const ComputerDetails = (props) => {
  const rows = props.computer.map((computer, index) => {
    return (
      <div key={index + computer.id}>                   
        <img src={computer.imageUrl} alt="" />
        <h5>{computer.name}</h5> 
        <h5>{computer.price}</h5> 
        <p>{computer.description}</p>
        <p>{computer.computerSpecs}</p>
        
        <button onClick={() => {props.addToCart(computer);}} className="btn btn-primary btn-info" style={{marginRight: '10px'}}>
            Add to cart
        </button>

        <button onClick={() => {props.showAllComputers();}} className="btn btn-primary btn-info"  style={{marginLeft: '10px'}}>
            Go back
        </button>
      </div>    
    );
  });

  return (   
    <div>
        {rows}
        <br></br>
    </div>
  );
};

export default ComputerDetails;
