import React, { Component } from "react";

class CreateOrder extends Component {
  createOrder = (event) => {
    event.preventDefault();

    const orderData = {
      FirstName: event.target["firstName"].value,
      LastName: event.target["lastName"].value,
      Address: event.target["address"].value,
      City: event.target["city"].value,
      State: event.target["state"].value,
      ZipCode: event.target["zipCode"].value,
      PhoneNumber: event.target["phoneNumber"].value,
    };

    this.props.createOrder(orderData);
  };

  render() {
    return (
      <div className="col-md-4">         
        <form onSubmit={this.createOrder}>

          <div className="row mb-2">
            <label htmlFor="firstName">
              FirstName:
            </label>
            <input
              id="firstName"
              type="text"
              required
              minLength="1"
              className="form-contorl col-18"
              placeholder="Enter Name"
            />
          </div><br></br>

          <div className="row mb-2">
            <label htmlFor="lastName">
              LastName:
            </label>
            <input
              id="lastName"
              type="text"
              required
              minLength="1"
              className="form-contorl col-18"
              placeholder="Enter Name"
            />
          </div><br></br>

          <div className="row mb-2">
            <label htmlFor="address">
             Address:
            </label>
            <input
              id="address"
              type="text"
              required
              minLength="2"
              className="form-contorl col-18"
              placeholder="Enter Name"
            />
          </div><br></br>

          <div className="row mb-2">
            <label htmlFor="city">
              City:
            </label>
            <input
              id="city"
              type="text"
              required
              minLength="2"
              className="form-contorl col-18"
              placeholder="Enter Name"
            />
          </div><br></br>

          <div className="row mb-2">
            <label htmlFor="state">
              State:
            </label>
            <input
              id="state"
              type="text"
              required
              minLength="2"
              className="form-contorl col-18"
              placeholder="Enter Name"
            />
          </div><br></br>

          <div className="row mb-2">
            <label htmlFor="zipCode">
              ZipCode:
            </label>
            <input
              id="zipCode"
              type="text"
              required
              minLength="2"
              className="form-contorl col-18"
              placeholder="Enter Name"
            />
          </div><br></br>

          <div className="row mb-2">
            <label htmlFor="phoneNumber">
             PhoneNumber:
            </label>
            <input
              id="phoneNumber"
              type="text"
              required
              minLength="2"
              className="form-contorl col-18"
              placeholder="Enter Name"
            />
          </div><br></br>

          <div >
            <button className="btn btn-success" >Submit</button>
          </div>

        </form>
      </div>
    );
  }
}
export default CreateOrder;
