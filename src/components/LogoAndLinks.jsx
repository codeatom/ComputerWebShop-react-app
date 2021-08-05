import React from "react";


const LogoAndLinks = (props) => {

  const rows = props.categories.map((category) => {
    return (
      <button class="btn bg-transparent" style={{color: '#0073e6'}} onClick={() => {props.showCategoryComputers(category.name);}}>
         <h5>{category.name}</h5>
      </button>    
    );
  });
 
    return (   
        <div className="col-md-4" >
           <img src="./Images/logo/logo.png" alt="Logo" />

           <br></br>
           <br></br>
           <br></br>

           <button className="btn bg-transparent" style={{color: '#0073e6'}} onClick={() => {props.showAllComputers();}}>
               <h5>All Computers</h5>    
           </button>

           <br></br>
           <br></br>

            {rows}

           <br></br>
           <br></br>
           
           <button class="btn bg-transparent" style={{color: '#006600'}} onClick={() => {props.showComputersOnSale();}}>
              <h5>Computers on sale</h5>    
            </button>
        </div>
      );
};

export default LogoAndLinks;
