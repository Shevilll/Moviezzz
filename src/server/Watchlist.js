import React, { useEffect, useRef } from "react";
import axios from "axios";

export default function Watchlist() {
    const isMountedRef = useRef(false);

    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            axios
                .post("http://localhost:8000/", { hi: "hi" })
                .then((response) => {
                    console.log("Data sent successfully");
                    console.log("Response:", response.data);
                })
                .catch((error) => {
                    console.log("Error sending data:", error);
                });
        }
    }, []);

    return <h1>Watchlist</h1>;
}
// axios
//     .get("http://localhost:8000")
//     .then((res) => console.log(res.data))
//     .catch((err) => console.log(err));
