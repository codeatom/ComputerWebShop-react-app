import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Computers from "./Computers";
import ComputerDetails from "./ComputerDetails";
import LogoAndLinks from "./LogoAndLinks";
import CartItemsTable from "./CartItemsTable";
import CreateOrder from "./CreateOrder";
import PlaceOrder from "./PlaceOrder";
import OrderComplete from "./OrderComplete";
import OrderHistoryRequest from "./OrderHistoryRequest";
import OrderHistory from "./OrderHistory";
import Receipt from "./Receipt";

import getComputers, {
  getCategories,
  createCartItem,
  getOrderedItems,
} from "../api/computerApi";


class App extends Component {
  state = {
    allComputersList: [],
    computerList: [],
    computerDetails: [],
    computerIdList: [],
    computerId: 0, 

    categoryList: [],
    categoryName: "All Computers",

    order: [],
    orderId: 0,
    orderedItemCost: 0,
    itemsTotalCost: 0,
    cartItemsList: [],
    
    jsonObject: {
      createOrder: {},
      computerIdList: [],
    },

    categories: false,
    showReceipt: false,
    showComputers: false,
    showPlaceOrder: false,
    showItemsInCart: false,
    showCreateOrder: false,
    showOrderHistory: false,
    showOrderComplete: false,
    showComputerdetails: false,
    showOrderHistoryRequest: false, 
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
    this.showComputers();
  }


  showComputersOnSale = () => {  
    const categoryComputers = this.state.allComputersList.filter( 
      computer => computer.isOnSale === true
    );

    this.setState({computerList : categoryComputers});
    this.setState({categoryName : "On Sale"})
    this.showComputers();
  }


  showCategoryComputers = (categoryName) => {   
    const categoryComputers = this.state.allComputersList.filter( 
      computer => computer.categoryName.toString() === categoryName.toString()
    );

    this.setState({computerList : categoryComputers });
    this.setState({categoryName : categoryName})
    this.showComputers();
  }


  displayComputerDetails = (computerId) => {
    const computer = this.state.allComputersList.filter( 
      selectedComputer => selectedComputer.id.toString() === computerId.toString()
    );

    this.setState({computerDetails : computer });
    this.setState({categoryName : ""})
    this.showComputerDetails();
   };


  showComputers = () => {
    this.closeSideElement();
    this.setState({
      showComputers : true,
    });
  };


  showComputerDetails = () => {
    this.closeSideElement();
    this.setState({
      showComputerdetails : true,
    });
  };


  showCartItems = () => {
    this.closeSideElement();
    this.setState({
      showItemsInCart : true,
    });
  };


  showCreateOrder = () => {
    this.closeSideElement();
    this.setState({
      showCreateOrder: true,
    });
  };


  showPlaceOrder = () => {
    this.closeSideElement();
    this.setState({
      showPlaceOrder: true,
    });
  };


  showOrderComplete = () => {
    this.closeSideElement();
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


  showOrderHistory = () => {
    this.closeSideElement();
    this.setState({
      showOrderHistory: true,
    });
  }


  showOrderHistoryRequest = () => {
    this.closeSideElement();
    this.setState({
      showOrderHistoryRequest: true,
    });
  }


  addToCart = (cartItem) => {
    this.state.cartItemsList.push(cartItem);
    this.state.computerIdList.push(cartItem.id);
    this.calculateTotalCost();
    this.showCartItems();
  };


  checkOut = () => {
    if(this.state.cartItemsList.length >= 1)
    this.showCreateOrder();
  };


  removeCartItem = (id) => {
    for(let i = 0; i<this.state.cartItemsList.length; i++){
       if(this.state.cartItemsList[i].id === id){
          this.state.cartItemsList.splice(i, 1);
          break;
       }
    }

    this.calculateTotalCost();
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


  createOrder = (orderData) => {
    this.setState({
      jsonObject : {
        createOrder: orderData,
        computerIdList: this.state.computerIdList, 
      }
    });

    this.showPlaceOrder();
  };


  placeOrder = async () => {
    let jsonObject = await createCartItem(this.state.jsonObject);

    if (jsonObject !== undefined) { 
      this.setState({
        orderId: jsonObject.orderId,
      });

      this.clearShoppingCart();
      this.showOrderComplete();
    }
  };


  clearShoppingCart = () => {
    this.setState({
      order: this.state.cartItemsList,
      orderedItemCost: this.state.itemsTotalCost,
      cartItemsList: [],
      computerIdList: [],
      });
  };


  getOrderHistory = async (orderId) => {
    let orderdetails = await getOrderedItems(orderId);  

    if (orderdetails !== undefined) {     
      this.state.order = orderdetails;
      this.showOrderHistory();
    } 
  };


  closeSideElement = () => {
    this.setState({
      categories: false,
	    showReceipt: false,
      showComputers: false,
      showPlaceOrder: false,
      showItemsInCart: false,
      showCreateOrder: false,
      showOrderHistory: false,
      showOrderComplete: false,
      showComputerdetails : false,
      showOrderHistoryRequest: false
    });
  };
  


  //----------Render----------//
  render() {  
    const sideElement =
    this.state.showComputerdetails ? (
    <div>
        <ComputerDetails 
           computer={this.state.computerDetails}
           categoryName={this.state.categoryName}          
           showAllComputers={this.showAllComputers} 
           addToCart={this.addToCart}
        />
    </div>
    ) : this.state.showItemsInCart ? (
      <div>
        <CartItemsTable 
           cartItems={this.state.cartItemsList}
           itemsTotalCost={this.state.itemsTotalCost}
           removeCartItem={this.removeCartItem}
           checkOut={this.checkOut}     
        />
    </div>
     ) : this.state.showCreateOrder ? (
      <div>
        <CreateOrder 
           cartItems={this.state.cartItemsList}
           itemsTotalCost={this.state.itemsTotalCost}
           createOrder={this.createOrder}     
        />
    </div>
    ) : this.state.showPlaceOrder ? (
      <div>
        <PlaceOrder 
           cartItems={this.state.cartItemsList}
           itemsTotalCost={this.state.itemsTotalCost}
           placeOrder={this.placeOrder}     
        />
    </div>
     ) : this.state.showOrderComplete ? (
      <div>
        <OrderComplete 
           cartItems={this.state.cartItemsList}
           itemsTotalCost={this.state.itemsTotalCost}
           jsonObject={this.state.jsonObject}
           orderId={this.state.orderId}
           showReceipt={this.showReceipt}     
        />
    </div>
    ) : this.state.showOrderHistoryRequest ? (
      <div>
        <OrderHistoryRequest 
           getOrderHistory={this.getOrderHistory}     
        />
    </div>
    ) : this.state.showOrderHistory ? (
      <div>        
        <OrderHistory
           order={this.state.order}
           showReceipt={this.showReceipt}    
        />
    </div>
    ) : this.state.showReceipt ? (
      <div>
        <Receipt 
           order={this.state.order}
           itemsTotalCost={this.state.itemsTotalCost}
        />
    </div>
    ) : (
      <div>
        <Computers 
           computers={this.state.computerList}
           computer={this.state.computerDetails}
           categoryName={this.state.categoryName}
           close={this.closeSideDiv} 
           displayComputerDetails={this.displayComputerDetails}
           addToCart={this.addToCart} 
        />
    </div>
    );


    return (
      <React.Fragment>
        <Header
        cartItemsList={this.state.cartItemsList}
        showCartItems={this.showCartItems}
        />

        <div className="container stay-clear">
          <div className="row">

            <div className="col-4">
              <LogoAndLinks 
                categories={this.state.categoryList} 
                showCategoryComputers={this.showCategoryComputers} 
                showAllComputers={this.showAllComputers}
                showComputersOnSale={this.showComputersOnSale}
                showOrderHistoryRequest={this.showOrderHistoryRequest} 
              />
            </div>

            <div className="col-8">
             {sideElement}
            </div>

          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default App;