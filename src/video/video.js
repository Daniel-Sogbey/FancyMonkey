const fs = require("fs");
const filePath = require("path");
const express = require("express");
// const a = require('../public/assets/Pixel.mkv');

const router = new express.Router();

router.get("/video", function(req, res) {
  console.log(filePath.join(__dirname, "../public/assets/video.mp4"));

  // const url = new URL("/watch?v=XlZx9VuH4Yw", "https://www.youtube.com/");

  // "Pixel.mkv";
  // "../public/assets/video.mp4";

  const path = "../public/assets/video.mp4";
  // "C:/Users/DANIEL/Desktop/Video-Streaming/src/public/assets/Pixel.mkv";
  const stat = fs.statSync(path);

  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    console.log(req.headers, "headers");
    console.log(range, "range");
    const parts = range.replace(/bytes=/, "").split("-");

    console.log(parts, "parts");
    const start = parseInt(parts[0], 10);

    console.log(start, "start");
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    console.log(end, "end");
    const chunkSize = end - start + 1;

    console.log(chunkSize, "chunckSize");
    const file = fs.createReadStream(path, { start, end });

    console.log(file, "file");

    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

module.exports = router;
