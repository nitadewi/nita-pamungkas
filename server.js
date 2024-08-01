const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Include the cors package
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));


const url ='https://script.google.com/macros/s/AKfycbyOUnB-ZG6F3WQVi5xgYNqdkjQIO_DzbMiXfT1ZNAQRt7mlFG2OXmyKAtGXbfYUiqp3/exec'

app.get('/main', (req, res)=> {
  res.sendFile(path.join(__dirname,'/public','main.html'));
})

app.post('/comment', async (req, res) => {
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


app.get('/comment', async (req, res) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: req.query // Pass query parameters if any
      });
      if (response.status !== 200) {
        throw new Error(`Request failed with status code ${response.status}`);
      } else {
        res.json(response.data);
      }
    } catch (error) {
      res.status(error.response ? error.response.status : 500).send(error.message);
    }
  });



app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});