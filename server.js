const express = require("express");
const ffmpeg = require("fluent-ffmpeg");
const fileUpload = require("express-fileupload");
const app = express();

app.use(express.static("vendor"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

ffmpeg.setFfmpegPath(
  "E:/Development/NodeJs/videoConverter/ffmpeg/bin/ffmpeg.exe"
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/mp4tomp3", (req, res) => {
  res.contentType("video/avi");
  res.attachment(req.files.mp4.name + ".mp3");

  req.files.mp4.mv("tmp/" + req.files.mp4.name, function (err) {
    if (err) return res.sendStatus(500).send(err);
    console.log("File uploaded successfully");
  });

  ffmpeg("tmp/" + req.files.mp4.name)
    .toFormat("mp3")
    .on("end", function () {
      console.log("Done!");
    })
    .on("error", function (err) {
      console.log("An error occured " + err.message);
    })
    .pipe(res, { end: true });
});

app.listen(5000, () => {
  console.log("Server is listening on Port 5000");
});
