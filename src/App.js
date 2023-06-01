import axios from "axios";

export default function App() {
    function data() {
        axios
            .get("http://localhost:8000/data")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return <button onClick={data}>Hello World</button>;
}
