const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve the HTML file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Make sure 'index.html' is in the same directory as server.js
});

app.post('/save-card', (req, res) => {
    const cardData = req.body;

    // Append card data to cards.json
    const filePath = path.join(__dirname, 'cards.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        let cards = [];
        if (!err && data) {
            try {
                cards = JSON.parse(data);
            } catch (e) {
                console.error("Failed to parse existing JSON data:", e);
            }
        }

        cards.push(cardData);
        fs.writeFile(filePath, JSON.stringify(cards, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Failed to write JSON data:", err);
                return res.status(500).send("Error saving card data");
            }
            res.send("Card data saved successfully");
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
