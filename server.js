import { join, dirname } from "path";
import express from "express";
const app = express();
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

const defaultData = {
  cities: [
    {
      name: "Hamburg",
      inhabitants: 1800000
    },
    {
      name: "Köln",
      inhabitants: 1086000
    },
    {
      name: "Berlin",
      inhabitants: 4000000
    }
  ]
};

db.data ||= defaultData;
await db.write();

app.get("/", (req, res) => {
  db.read();
  res.send(db.data.cities);
});

app.listen(3000, function () {
  console.log("http://localhost:3000, listening on port 3000");
});
