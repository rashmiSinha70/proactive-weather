const express = require("express");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//weather get api

async function fetchApi(location) {
  let response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=898PCRL43Z3M2UJLSMKMZT99H&contentType=json`
  );
  let jsonResponse = await response.json();
  //console.log(jsonResponse)
  return jsonResponse;
}

app.post("/search", (req, res) => {
  let location = req.body.location;
  console.log(req.body);
  fetchApi(location)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`connected to  ${port}`);
});
