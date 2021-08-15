import axios from "axios";


export default function getComputers() {
  return fetch("https://localhost:44310/api/React/")
        .then((data) => data.json());
}


export async function getCategories() {
  return fetch("https://localhost:44310/api/GetCategories")
        .then((data) => data.json());
}


export async function getOrderedItems(orderId) {
  return fetch("https://localhost:44310/api/GetOrderedItems/" + orderId)
        .then((data) => data.json());
}


export async function createCartItem(jsonObject) {
  try {
    let response = await axios.post("https://localhost:44310/api/CreateOrder", {
      ComputerIdList: jsonObject.computerIdList,
      CreateOrder: jsonObject.createOrder,
      OrderId: 0,
    });

    let json = await response.data;
    return json;
  } catch (e) {
    console.log("Error", e);
  }
}


// export async function createCartItem(jsonObject) {
//   return fetch("https://localhost:44310/api/ShoppingCart", {
//     method: 'POST',
//     body: JSON.stringify(jsonObject),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8'
//     }
// })
// .then(response => response.json())
// .then(json => {
//     console.log(json);
// });
// }
