import React, { useEffect, useRef } from "react";
import axios from "axios";

export default function Watchlist() {
    return <h1>Watchlist</h1>;
}
export function getData() {
    axios
        .get("http://localhost:8000/get")
        // .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
}
getData();
export function postData(title, poster_path) {
    axios
        .post("http://localhost:8000/post", {
            Movietitle: title,
            posterpath: poster_path,
        })
        .then((response) => {
            console.log("Data sent successfully");
            console.log("Response:", response.data);
        })
        .catch((error) => {
            console.log("Error sending data:", error);
        });
}

export function deleteData(title, poster_path) {
    axios
        .post("http://localhost:8000/delete", {
            Movietitle: title,
            posterpath: poster_path,
        })
        .then((response) => {
            console.log("Data deleted successfully");
            console.log("Response:", response.data);
        })
        .catch((error) => {
            console.log("Error sending data:", error);
        });
}
