import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Computers from "./Computers";
import ComputerDetails from "./ComputerDetails";
import LogoAndLinks from "./LogoAndLinks";
import CartItemsTable from "./CartItemsTable";
import CartSummary from "./CartSummary";

import getComputers, {
  getCategories,
  createCartItem,
} from "../api/computerApi";



class App extends Component {
  state = {
    allComputersList: [],
    computerList: [],
    computerDetails: [],
    
    categoryList: [],
    categoryName: "All Computers",
    categories: false,

    showComputers: true,
    showItemsInCart: false,
    showComputerdetails: false,

    itemsTotalCost: 0,
    cartItemsList: [],
    
    computerId: 0, 
  };


  componentDidMount() {
    const _this = this;

    getCategories().then((categories) => {
      _this.setState({ categoryList: categories });
    });

    getComputers().then((computers) => {
      _this.setState({ allComputersList: computers });
      _this.setState({ computerList: computers });
    });
  }


  showAllComputers = () => {  
    const categoryComputers = this.state.allComputersList.filter( 
      computer => computer.categoryName !== ""
    );

    this.setState({computerList : categoryComputers});
    this.setState({categoryName : "All Computers"})

    this.closeSideElement();
    this.showComputers();
  }


  showComputersOnSale = () => {  
    const categoryComputers = this.state.allComputersList.filter( 
      computer => computer.isOnSale === true
    );

    this.setState({computerList : categoryComputers});
    this.setState({categoryName : "On Sale"})

    this.closeSideElement();
    this.setState({ showComputers: true, });
  }


  showCategoryComputers = (categoryName) => {   
    const categoryComputers = this.state.allComputersList.filter( 
      computer => computer.categoryName.toString() === categoryName.toString()
    );

    this.setState({computerList : categoryComputers });
    this.setState({categoryName : categoryName})

    this.closeSideElement();
    this.showComputers();
  }


  displayComputerDetails = (computerId) => {
    const computer = this.state.allComputersList.filter( 
      selectedComputer => selectedComputer.id.toString() === computerId.toString()
    );

    this.setState({computerDetails : computer });
    this.setState({categoryName : ""})

    this.closeSideElement();
    this.showComputerDetails();
   };


  closeSideElement = () => {
    this.setState({
      showComputers: false,
      showComputerdetails : false,
      categories: false,
      showItemsInCart: false,
    });
  };


  showComputers = () => {
    this.setState({
      showComputers : true,
    });
  };


  showComputerDetails = () => {
    this.setState({
      showComputerdetails : true,
    });
  };


  showCartItems = () => {
    this.setState({
      showItemsInCart : true,
    });
  };


  addToCart = (cartItem) => {
    this.state.cartItemsList.push(cartItem);

    this.calculateTotalCost();
    this.showCartItems();
  };


  checkOut = () => {
    createCartItem(this.state.cartItemsList);
  };


  removeCartItem = (id) => {
    for(let i = 0; i<this.state.cartItemsList.length; i++){
       if(this.state.cartItemsList[i].id === id){
          this.state.cartItemsList.splice(i, 1);
          break;
       }
    }

    this.calculateTotalCost();
    this.closeSideElement();
    this.showCartItems();
  };


   calculateTotalCost = () =>{
    let totalCost = 0;

    for(let i = 0; i<this.state.cartItemsList.length; i++){
      totalCost = totalCost + Number(this.state.cartItemsList[i].price);
    }

    this.setState({
      itemsTotalCost : totalCost,
    });
   }



  render() {  
    const sideElement =
    this.state.showComputerdetails ? (
    <div>
        <h3 style={{color: '#006600'}}>{this.state.categoryName}</h3>

        <hr></hr>
        <br></br>

        <ComputerDetails 
           computer={this.state.computerDetails}
           addToCart={this.addToCart}
           showAllComputers={this.showAllComputers} 
        />
    </div>
    ) : this.state.showItemsInCart ? (
      <div>
        <h3>Cart Items</h3>

        <hr></hr>
        <br></br>

        <CartItemsTable 
           cartItems={this.state.cartItemsList}
           itemsTotalCost={this.state.itemsTotalCost}
           removeCartItem={this.removeCartItem}
           checkOut={this.checkOut} 
           placeOrder={this.placeOrder}     
        />
    </div>
    ) : (
      <div>
         <h3 style={{color: '#006600'}}>{this.state.categoryName}</h3>

         <hr></hr>
         <br></br>

        <Computers 
           computers={this.state.computerList}
           computer={this.state.computerDetails}
           close={this.closeSideDiv} 
           displayComputerDetails={this.displayComputerDetails}
           addToCart={this.addToCart} 
        />
    </div>
    );


    return (
      <React.Fragment>
        <Header />

        <div className="container stay-clear">
          <div className="row">
             <LogoAndLinks 
               categories={this.state.categoryList} 
               showCategoryComputers={this.showCategoryComputers} 
               showAllComputers={this.showAllComputers}
               showComputersOnSale={this.showComputersOnSale} 
             />

             {sideElement}

             <CartSummary
               cartItemsList={this.state.cartItemsList} 
               showCartItems={this.showCartItems} 
             />
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default App;