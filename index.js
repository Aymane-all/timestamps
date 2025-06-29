const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date', (req, res) => {
    let dateParam = req.params.date;
    let date;

    if (!dateParam) {
        date = new Date();
    } else if (!isNaN(Number(dateParam))) {
        date = new Date(Number(dateParam));
    } else {
        date = new Date(dateParam);
    }

    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }

    res.json({ 
        unix: date.getTime(), 
        utc: date.toUTCString() 
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
