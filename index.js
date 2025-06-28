const express = require('express');
const app = express();



app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
});

let listener = app.listen(process.env.Port || 3000, () => {
    console.log('Server is running on port 3000' + listener.address().port);
});

