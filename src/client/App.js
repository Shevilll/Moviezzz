import { useState } from "react";
import { GetMovies } from "../server/functions";
export default function App() {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("One");

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Moviezzz
                    </a>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Page"
                            aria-label="Search"
                            onChange={(e) => setPage(e.target.value)}
                            defaultValue={1}
                        />
                    </form>
                </div>
            </nav>
            <GetMovies page={page ? page : 1} query={query ? query : "One"} />
        </>
    );
}
