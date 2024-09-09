import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/"

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/anime", async (req, res) => {
    try {
        // get anime recommendation
        const response = await axios.get(`${API_URL}recommendations/anime`);
        const responseData = response.data;
        const recommendations = responseData.data[Math.floor(Math.random() * responseData.data.length) + 1];
        const anime = recommendations.entry;
        const randomIndexAnime = Math.floor(Math.random() * anime.length) + 1;
        console.log(randomIndexAnime);
        console.log(anime[randomIndexAnime]);
        
        // get full data from recommendation
        console.log(anime[randomIndexAnime].mal_id);
        const animeID = anime[randomIndexAnime].mal_id;
        const secondResponse = await axios.get(`${API_URL}anime/${animeID}/full`);
        const secondResponseData = secondResponse.data
        console.log(secondResponseData);

        res.render("anime.ejs", secondResponseData);
    } catch (error) {
        console.log(error.response);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});