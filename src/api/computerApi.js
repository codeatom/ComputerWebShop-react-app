import axios from "axios";


export default function getComputers() {
  return fetch("https://localhost:44310/api/React/")
        .then((data) => data.json());
}


export async function getCategories() {
  return fetch("https://localhost:44310/api/Category")
        .then((data) => data.json());
}


export async function reateCartItem(id) {
  try {
    let response = await axios.delete("https://localhost:44310/api/ShoppingCart/" + id);
    console.log(response);
    return true;
  } catch (e) {
    console.log("Error!", e);
    return false;
  }
}


export async function createCartItem(jsonObject) {

  return fetch("https://localhost:44310/api/ShoppingCart", {
    method: 'POST',
    body: JSON.stringify(jsonObject),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
})
.then(response => response.json())
.then(json => {
    console.log(json);
});
}
