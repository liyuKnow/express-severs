const express = require("express");
const getLocalIp = require("./utils/getLocalIp");

const PORT = "8080";
const IP_ADDRESS = getLocalIp();

const app = express();

app.get("/api/users", (req, res) => {
  res.json({
    message: "hello user on local network",
  });
});

app.listen(PORT, IP_ADDRESS, (err) => {
  if (err) console.log(err);

  console.log(`connected on http://${IP_ADDRESS}:${PORT}/`);
});
