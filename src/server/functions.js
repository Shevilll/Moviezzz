import axios from "axios";
import { useState, useEffect } from "react";

export function GetMovies({ page, query }) {
    const API = process.env.REACT_APP_API_KEY;
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?&api_key=${API}&page=${page}&query=${query}`
            )
            .then((res) => setData([res.data]));
    }, [page, query, API]);
    console.log(data[0]);
    return (
        <>
            <div className="mainbody">
                {data.map((item, index) =>
                    item.results.map((titles, id) =>
                        titles.poster_path ? (
                            <div key={id} className="mainbox">
                                <p>{titles.title}</p>
                                <img
                                    src={
                                        "https://image.tmdb.org/t/p/w1280" +
                                        titles.poster_path
                                    }
                                    width={"300px"}
                                    height={"400px"}
                                    id="image"
                                    alt={titles.title}
                                ></img>
                            </div>
                        ) : null
                    )
                )}
            </div>
        </>
    );
}
