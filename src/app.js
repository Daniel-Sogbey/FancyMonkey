const path = require("path");

const express = require("express");
const videoRouter = require("./video/video");

const app = express();

app.use(express.json());
app.use(videoRouter);

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is listening on port " + port));
