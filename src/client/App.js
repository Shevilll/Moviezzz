import { useState } from "react";
import { GetMovies } from "../server/functions";
import { pages } from "../server/functions";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import MovieDetails from "../server/MovieDetails";
import Watchlist from "../server/Watchlist";

export default function App() {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("One Piece");

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <NavBar setPage={setPage} setQuery={setQuery} />
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
                                <NavBar setPage={setPage} setQuery={setQuery} />
                                <MovieDetails />
                            </>
                        }
                    />
                    <Route
                        path="/watchlist"
                        element={
                            <>
                                <NavBar setPage={setPage} setQuery={setQuery} />
                                <Watchlist />
                            </>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}
function NavBar({ setPage, setQuery }) {
    const navigate = useNavigate();
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
                            autoComplete="off"
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setPage(1);
                            }}
                        />
                    </form>
                    <button
                        className="navbutton"
                        onClick={() => navigate("/watchlist")}
                    >
                        Watchlist
                    </button>
                </div>
            </nav>
            ;
        </>
    );
}
