import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function GetMovies({ page, query }) {
    const API = process.env.REACT_APP_API_KEY;
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?&api_key=${API}&page=${page}&query=${query}`
            )
            .then((res) => {
                setData([res.data]);
            });
    }, [page, query, API]);
    handleExtras(data);
    return (
        <>
            <div className="mainbody">
                {data.map((item, index) =>
                    item.results.map((result, id) =>
                        result.poster_path ? (
                            <div
                                key={id}
                                className="mainbox"
                                onClick={() => {
                                    navigate("/about", {
                                        state: [
                                            "https://image.tmdb.org/t/p/w1280" +
                                                result.backdrop_path,
                                            result.title,
                                            result.overview,
                                            result.popularity,
                                            result.release_date,
                                        ],
                                    });
                                }}
                            >
                                <p>{result.title}</p>
                                <img
                                    src={
                                        "https://image.tmdb.org/t/p/w1280" +
                                        result.poster_path
                                    }
                                    width={"300px"}
                                    height={"400px"}
                                    id="image"
                                    alt={result.title}
                                ></img>
                            </div>
                        ) : null
                    )
                )}
            </div>
        </>
    );
}
let pages;
function handleExtras(data) {
    if (data && data.length > 0) {
        pages = data[0].total_pages;
    }
    const searchbar = document.getElementById("searchbar");
    if (searchbar) {
        searchbar.disabled = false;
    }
}
export { pages };
