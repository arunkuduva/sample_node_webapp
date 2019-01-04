var express = require("express");
var request = require("request");
var app = express();

app.set("port", process.env.PORT || 8080);
app.use(express.static(__dirname + "/public"));

async function getMyIp() {
  return new Promise(function(resolve, reject) {
    request("https://api.ipify.org?format=json", null, function(err, resp) {
      if (err) reject(err);
      else resolve(resp.body);
    });
  });
}

app.get("/", async function(req, resp) {
  try {
    const ipAddress = await getMyIp();
    resp.send(`Hello Simbu from ${ipAddress}`);
  } catch (e) {
    resp.send(`Error while resolving servers ip address ${e.message}`);
  }
});

app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost:" + app.get("port"));
});
