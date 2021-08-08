import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Computers from "./Computers";
import ComputerDetails from "./ComputerDetails";
import LogoAndLinks from "./LogoAndLinks";
import CartItemsTable from "./CartItemsTable";
import CartSummary from "./CartSummary";
import CreateOrder from "./CreateOrder";
import PlaceOrder from "./PlaceOrder";
import OrderComplete from "./OrderComplete";
import Receipt from "./Receipt";

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

    computerId: 0, 
    itemsTotalCost: 0,
    cartItemsList: [],
    computerIdList: [],
    
    jsonObject: {
      computerIdList: [],
      createOrder: {},
    },

    categories: false,
    showReceipt: false,
    showComputers: false,
    showPlaceOrder: false,
    showItemsInCart: false,
    showCreateOrder: false,
    showOrderComplete: false,
    showComputerdetails: false,

    orderedItemCost: 0,
    orderedItems: [],
  }

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
      categories: false,
      showReceipt: false,
      showComputers: false,
      showPlaceOrder: false,
      showItemsInCart: false,
      showCreateOrder: false,
      showOrderComplete: false,
      showComputerdetails : false,
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


  showCreateOrder = () => {
    this.setState({
      showCreateOrder: true,
    });
  };


  showPlaceOrder = () => {
    this.setState({
      showPlaceOrder: true,
    });
  };


  showOrderComplete = () => {
    this.setState({
      showOrderComplete: true,
    });
  }


  showReceipt = () => {
    this.closeSideElement();

    this.setState({
      showReceipt: true,
    });
  }


  addToCart = (cartItem) => {
    this.state.cartItemsList.push(cartItem);
    this.state.computerIdList.push(cartItem.id);

    this.calculateTotalCost();
    this.showCartItems();
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


  checkOut = () => {
    this.closeSideElement();
    this.showCreateOrder();
  };


  createOrder = (orderData) => {
    this.setState({
      jsonObject : {
        createOrder: orderData,
        computerIdList: this.state.computerIdList, 
      }
    });

    this.closeSideElement();
    this.showPlaceOrder();
  };


  placeOrder = async () => {
    let jsonObject = null;
    jsonObject = await createCartItem(this.state.jsonObject);
 
     if (jsonObject !== null) {     
       this.clearShoppingCart();
       this.closeSideElement();
       this.showOrderComplete();
     }
   };


  clearShoppingCart = () => {
    this.setState({
      orderedItems: this.state.cartItemsList,
      orderedItemCost: this.state.itemsTotalCost,
      cartItemsList: [],
      computerIdList: [],
      });
  };

  

  //----------Render----------//
  render() {  
    const sideElement =
    this.state.showComputerdetails ? (
    <div>
        <h3 style={{color: '#006600'}}>{this.state.categoryName}</h3>

        <hr></hr>
        <br></br>

        <ComputerDetails 
           computer={this.state.computerDetails}          
           showAllComputers={this.showAllComputers} 
           addToCart={this.addToCart}
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
        />
    </div>
     ) : this.state.showCreateOrder ? (
      <div>
        <h3>Please enter your information</h3>

        <hr></hr>
        <br></br>

        <CreateOrder 
           cartItems={this.state.cartItemsList}
           itemsTotalCost={this.state.itemsTotalCost}
           createOrder={this.createOrder}     
        />
    </div>
    ) : this.state.showPlaceOrder ? (
      <div>
        <h3>Complete your order</h3>

        <hr></hr>
        <br></br>

        <PlaceOrder 
           cartItems={this.state.cartItemsList}
           itemsTotalCost={this.state.itemsTotalCost}
           placeOrder={this.placeOrder}     
        />
    </div>
     ) : this.state.showOrderComplete ? (
      <div>
        <br></br><br></br><br></br><br></br>                         
        <h5>Thank you for your order</h5>

        <OrderComplete 
           cartItems={this.state.cartItemsList}
           itemsTotalCost={this.state.itemsTotalCost}
           showReceipt={this.showReceipt}     
        />
    </div>
    ) : this.state.showReceipt ? (
      <div>
        <br></br><br></br>
        <h5>Here is your receipt</h5>
        <br></br>

        <Receipt 
           orderedItems={this.state.orderedItems}
           itemsTotalCost={this.state.itemsTotalCost}
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