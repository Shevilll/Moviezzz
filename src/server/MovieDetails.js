import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MovieDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [backdrop, title, overview, popularity, releasedate] = location.state;
    const searchbar = document.getElementById("searchbar");
    if (searchbar) {
        searchbar.disabled = true;
    }
    return (
        <div className="aboutdiv">
            <h1 id="abouttitile">{title}</h1>
            <img src={backdrop} alt={title} id="bannerimg" />
            <p className="info">{overview}</p>
            <h5 className="info">Popularity: {popularity}</h5>
            <h5 className="info">Release-Date: {releasedate}</h5>
            <button
                id="backbutton"
                className="navbutton"
                onClick={() => navigate("/")}
            >
                Go Back
            </button>
        </div>
    );
};

export default MovieDetails;
