const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date?', (req, res) => {
    let dateParam = req.params.date;
    let date;

    if (!dateParam) {
        date = new Date(); // cas où aucun paramètre n'est donné
    } else {
        // Si le paramètre est numérique (timestamp)
        if (!isNaN(Number(dateParam))) {
            date = new Date(Number(dateParam));
        } else {
            // Sinon, on le traite comme une date classique
            date = new Date(dateParam);
        }
    }

    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }

    res.json({ unix: date.getTime(), utc: date.toUTCString() });
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});