import { useState } from "react";
import { GetMovies } from "../server/functions";
import { pages } from "../server/functions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "../server/MovieDetails";

export default function App() {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("One Piece");

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" id="Moviezzz" href="/">
                        Moviezzz
                    </a>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            id="searchbar"
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setPage(1);
                            }}
                        />
                    </form>
                </div>
            </nav>

            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div className="navigation">
                                    <button
                                        className="navbutton"
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 1}
                                    >
                                        {"<"}
                                    </button>
                                    <label>{page}</label>
                                    <button
                                        className="navbutton"
                                        onClick={() => setPage(page + 1)}
                                        disabled={page === pages}
                                    >
                                        {">"}
                                    </button>
                                </div>
                                <GetMovies
                                    page={page ? page : 1}
                                    query={query ? query : "One Piece"}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <>
                                <MovieDetails />
                            </>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}
