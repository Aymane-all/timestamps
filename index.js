const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Handle empty date parameter (current time)
app.get('/api/', (req, res) => {
    const date = new Date();
    res.json({ 
        unix: date.getTime(), 
        utc: date.toUTCString() 
    });
});

// Handle date parameter
app.get('/api/:date', (req, res) => {
    let dateParam = req.params.date;
    let date;

    // Check if it's a number (Unix timestamp)
    if (!isNaN(Number(dateParam))) {
        date = new Date(Number(dateParam));
    } else {
        // Try to parse as date string
        date = new Date(dateParam);
    }

    // Check if date is valid
    if (date.toString() === 'Invalid Date' || isNaN(date.getTime())) {
        return res.json({ error: 'Invalid Date' });
    }

    // Return the response with unix timestamp and UTC string
    res.json({ 
        unix: date.getTime(), 
        utc: date.toUTCString() 
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});