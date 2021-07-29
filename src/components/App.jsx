import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Computers from "./Computers";
import ComputerDetails from "./ComputerDetails";
import LogoAndLinks from "./LogoAndLinks";

import getComputers, {
  getCategories,
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
    showComputerdetails: false,
    
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


  addToCart = () => {
   // TODO
  };


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
    ) : (
      <div>
         <h3 style={{color: '#006600'}}>{this.state.categoryName}</h3>

         <hr></hr>
         <br></br>

        <Computers 
           computers={this.state.computerList}
           computer={this.state.computerDetails}
           displayComputerDetails={this.displayComputerDetails}
           addToCart={this.addToCart}
           close={this.closeSideDiv} 
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
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default App;