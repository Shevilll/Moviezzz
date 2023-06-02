const cors = require("cors");
const { configDotenv } = require("dotenv");
const app = require("express")();
app.use(cors());
const API = configDotenv((options = { path: ".env.local" })).parsed.API_KEY;
const PORT = 8000;

console.log(API);
app.listen(PORT, () => console.log(`listening to ${PORT}`));
