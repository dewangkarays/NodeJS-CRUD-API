const crypto = require("crypto");
const requestBodyparser = require("../util/body-parser");
const simpanData = require("../util/save-data");

module.exports = async (req, res) => {
  if (req.url === "/api/users") {
    try {
      let body = await requestBodyparser(req);
      body.id = crypto.randomUUID();

      const { id, ...userWithoutId } = body;
      const userWithIdOnTop = { id, ...userWithoutId };
      req.users.push(userWithIdOnTop);
      const lastIndex = req.users.length - 1;
      const newUserOrder = [...req.users.slice(0, lastIndex), req.users[lastIndex]];

      simpanData(newUserOrder);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
