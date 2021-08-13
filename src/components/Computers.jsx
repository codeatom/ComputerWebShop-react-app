import React from "react";


const Computers = (props) => {
  const rows = props.computers.map((computer, index) => {
    return (
      <div key={index + computer.id}>
          <div onClick={() => {props.displayComputerDetails(computer.id);}}>                       
             <img src={computer.imageThumbnailUrl} alt="" />
          </div>
          <div onClick={() => {props.displayComputerDetails(computer.id);}}>
             <h3>{computer.name}</h3> 
          </div>
           <h3>{computer.price}</h3> 
           <p>{computer.description}</p>
        
        <button onClick={() => {props.addToCart(computer);}} className="btn btn-primary btn-info" >
            Add to cart
        </button>

        <br></br><br></br><br></br><br></br>
        
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

export default Computers;
