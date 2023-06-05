import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteData, getData, postData } from "./Watchlist";

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
                                ></img>
                                <HeartButton result={result} />
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

async function getHeart(title) {
    let list = await axios.get("http://localhost:8000/get");
    list = list.data;
    // console.log(list);
    if (list) {
        // console.log(list);
        for (const element of list) {
            if (element.Movietitle === title) {
                return true;
            }
        }
    }
    return false;
}
async function checkHeart(title) {
    const result = await getHeart(title);
    return result;
}
function HeartButton({ result }) {
    const [heart, setHeart] = useState(false);
    // useEffect(async () => {
    //     let res = await checkHeart(result.title);
    //     console.log(res);
    //     setHeart(res);
    // }, []);
    const color = async () => {
        const heartStatus = await checkHeart(result.title);
        return heartStatus ? "red" : "black";
    };
    console.log(color);
    return (
        <>
            <button
                className="svgbutton"
                onClick={(e) => {
                    e.stopPropagation();
                    !heart
                        ? postData(
                              result.title,
                              "https://image.tmdb.org/t/p/w1280" +
                                  result.poster_path
                          )
                        : deleteData(
                              result.title,
                              "https://image.tmdb.org/t/p/w1280" +
                                  result.poster_path
                          );
                    setHeart(!heart);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="heart"
                    fill={color}
                >
                    <title>Add to Watchlist</title>
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
            </button>
        </>
    );
}
