import React, { Component } from "react";

class OrderHistoryRequest extends Component {
  createOrderHistory = (event) => {
    event.preventDefault();

    let orderId = event.target["orderId"].value;
    
    this.props.getOrderHistory(orderId);
  };

  render() {
    return (
      <div> 
        
        <br></br>                         
        <h5>Please enter your orderId</h5>  

        <form onSubmit={this.createOrderHistory}>
          <div className="row mb-2">
            <label htmlFor="orderId">
              OrderId:
            </label>
            <input
              id="orderId"
              type="text"
              required
              minLength="1"
              className="form-contorl col-18"
              placeholder="Enter your OrderId"
            />
          </div>
          <div >
            <button className="btn btn-success" >Submit</button>
          </div>
        </form>

      </div>
    );
  }
}

export default OrderHistoryRequest;
