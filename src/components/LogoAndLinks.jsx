import React from "react";


const LogoAndLinks = (props) => {

  const rows = props.categories.map((category, index) => {
    return (
      <button 
        key={index + category.id} 
        className="btn bg-transparent" 
        style={{color: '#0073e6'}} 
        onClick={() => {
          props.showCategoryComputers(category.name);
        }}>
        <h5>{category.name}</h5>
      </button>    
    );
  });
 
    return (   
        <div>
           <img src="./Images/logo/logo.png" alt="Logo" />

           <br></br>
           <br></br>
           <br></br>

           <button className="btn bg-transparent" style={{color: '#0073e6'}} onClick={() => {props.showAllComputers();}}>
               <h5>All Computers</h5>    
           </button>

           <br></br>

            {rows}

           <br></br>
           
           <button className="btn bg-transparent" style={{color: '#006600'}} onClick={() => {props.showComputersOnSale();}}>
              <h5>Computers on sale</h5>    
            </button>

            <br></br>
            <br></br>

            <button className="btn bg-transparent" style={{color: '#006600'}} onClick={() => {props.showOrderHistoryRequest();}}>
              <h6>Order history</h6>    
            </button>
        </div>
      );
};

export default LogoAndLinks;
