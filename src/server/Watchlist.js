import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeartButton } from "./functions";
import { useNavigate } from "react-router";

export default function Watchlist() {
    const [details, setDetails] = useState();
    const navigate = useNavigate();
    const searchbar = document.getElementById("searchbar");
    if (searchbar) {
        searchbar.disabled = true;
    }
    useEffect(() => {
        axios
            .get("http://localhost:8000/get")
            .then((res) => setDetails(res.data))
            .catch((err) => console.log(err));
    }, []);
    if (details !== undefined && details != []) {
        return (
            <>
                <div className="mainbody">
                    {details.map((result, index) => (
                        <div className="mainbox" key={index}>
                            <p id="title">{result.title}</p>
                            <img
                                src={
                                    "https://image.tmdb.org/t/p/w1280" +
                                    result.poster_path
                                }
                                width={"300px"}
                                height={"400px"}
                                id="image"
                                title={result.title}
                                alt={result.title}
                            />
                            <HeartButton result={result} />
                        </div>
                    ))}
                </div>
                <button
                    id="backbutton"
                    className="navbutton"
                    onClick={() => navigate("/")}
                >
                    Go Back
                </button>
            </>
        );
    } else {
        return <h1 style={{ textAlign: "center" }}>...</h1>;
    }
}
export function postData(title, poster_path) {
    axios
        .post("http://localhost:8000/post", {
            title: title,
            poster_path: poster_path,
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
            title: title,
            poster_path: poster_path,
        })
        .then((response) => {
            console.log("Data deleted successfully");
            console.log("Response:", response.data);
        })
        .catch((error) => {
            console.log("Error sending data:", error);
        });
}
