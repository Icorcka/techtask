const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(express.json());

async function getBusyIntervals(calendarId, startDate, endDate) {
  const calendar = google.calendar({version: 'v3', auth: process.env.API });
  const now = new Date();
  const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: (new Date(startDate)).toISOString(),
      timeMax: (new Date(endDate)).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
  });

  const busyIntervals = response.data.items.map(event => {
      return { start: event.start.dateTime || event.start.date, end: event.end.dateTime || event.end.date };
  });

  return busyIntervals;
}

app.get('/getBusyIntervals', async (req, res) => {
  try {
    const calendarId = req.params.calendarId;
    const { startDate, endDate } = req.query;
    
    const intervals = await getBusyIntervals(calendarId, startDate, endDate);
    res.json(intervals);
} catch (error) {
    res.status(500).send(error.toString());
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
