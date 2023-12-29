const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  console.log("the data to write in file:", data);
  try {
    const filePath = path.join(__dirname, "..", "data", "users.json");
    const jsonData = JSON.stringify(data, null, 2); 
    fs.writeFileSync(filePath, jsonData, "utf-8");
  } catch (err) {
    console.log(err);
  }
};
