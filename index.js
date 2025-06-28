const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
});
app.listen(process.env.Port || 3001 , () => {
    console.log('Server is running on port 3001' );
});

//  listener.address().port;  


app.get('/api/timestamp/:date', (req, res) => {
   let date ;
   dateparam = new Date(req.params.date);

   if (!dateparam) {
    date = new Date();
   } else {
    date = new Date(parseInt(dateparam));
   }
   res.json({unix: date.getTime(), utc: date.toUTCString()});
})