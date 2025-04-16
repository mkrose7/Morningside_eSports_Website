const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Google Sheets API function
async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1',
  });

  return res.data.values;
}

// Endpoint to serve sheet data as JSON
app.get('/api/teams', async (req, res) => {
  try {
    const data = await getSheetData();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Serve Teams.html at the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Teams.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
