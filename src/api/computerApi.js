//import axios from "axios";


export default function getComputers() {
  return fetch("https://localhost:44310/api/React/")
        .then((data) => data.json());
}


export async function getCategories() {
  return fetch("https://localhost:44310/api/Category")
        .then((data) => data.json());
}


export async function getComputerById(id) {
  try {
    let response = await fetch("https://localhost:44310/api/React/" + id);
    let json = await response.json();
    return json;
  } catch (e) {
    console.log("Error", e);
  }
}



