import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeartButton } from "./functions";

export default function Watchlist() {
    const [details, setDetails] = useState();
    useEffect(() => {
        axios
            .get("http://localhost:8000/get")
            .then((res) => setDetails(res.data));
    }, []);
    console.log(details);
    if (details !== undefined && details !== []) {
        return (
            <>
                <div className="mainbody">
                    {details.map((result, index) => (
                        <div className="mainbox" key={index}>
                            <p id="title">{result.title}</p>
                            <img
                                src={result.poster_path}
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
