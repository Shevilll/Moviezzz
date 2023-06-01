const cors = require("cors");
const { configDotenv } = require("dotenv");
const app = require("express")();
app.use(cors());
const API = configDotenv().parsed.API_KEY;
const PORT = 8000;

app.get("/data", (req, res) => {
    const data = { msg: "hello", api: API };
    res.json(data);
});

app.listen(PORT, () => console.log(`listening to ${PORT}`));
