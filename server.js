const express = require('express');
const fs = require('fs').promises;
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
const DATA_FILE = path.join(__dirname, 'public', 'data', 'data.json');

app.use(cors());
app.use(express.json());

app.get('/main', (req, res)=> {
  res.sendFile(path.join(__dirname,'/public','main.html'));
})

  async function readData() {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is empty, return an empty array
      return [];
    }
  }
  
  async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }
  
  // GET endpoint to retrieve all items
  app.get('/comment', async (req, res) => {
    try {
      const data = await readData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error reading data' });
    }
  });

  
  app.post('/comment', async (req, res) => {
    try {
      const { name, message, rsvp } = req.body;
  
      // Check if all required fields are present
      if (!name || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      let data = await readData();
      
      // If data is not an array, initialize it as an empty array
      if (!Array.isArray(data)) {
        data = [];
      }
  
      const newItem = {
        id: Date.now(),
        name,
        message,
        rsvp
      };
      data.push(newItem);
      await writeData(data);
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
  });


app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
