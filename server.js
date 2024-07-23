const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Include the cors package
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use((req,res)=>{
  res.status(404);
  res.send(`<h1>ERROR 404 NOT FOUND</h1>`)
})


const url ='https://script.google.com/macros/s/AKfycbyEIY5o7o5eKg3uzKMx0D4E6nPPc6bnK1UoUfVR1ruHxcRaHZHP22ZTozoQg07qPn-K/exec'


app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post(url, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});


app.get('/proxy', async (req, res) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: req.query // Pass query parameters if any
      });
      res.json(response.data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).send(error.message);
    }
  });

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
