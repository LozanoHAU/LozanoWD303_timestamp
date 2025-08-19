const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let d;

  if (!dateParam) d = new Date();
  else {
    if (/^\d{5,}$/.test(dateParam)) d = new Date(Number(dateParam));
    else d = new Date(dateParam);
  }

  if (isNaN(d.getTime())) return res.json({ error: "Invalid Date" });

  res.json({ unix: d.getTime(), utc: d.toUTCString() });
});

const listener = app.listen(process.env.PORT || 3000, () =>
  console.log("Your app is listening on port " + listener.address().port),
);
