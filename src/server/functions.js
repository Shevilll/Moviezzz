import axios from "axios";
export function data() {
    axios
        .get(
            "https://api.themoviedb.org/3/search/movie?&api_key=0e0301590d89e103d9115358b1ffae7e&page=1&query=demon"
        )
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}
