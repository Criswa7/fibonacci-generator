const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/fibonacci', (req, res) => {
  const { hours, minutes, seconds } = req.body;
  
  if (hours === undefined || minutes === undefined || seconds === undefined) {
    return res.status(400).json({ error: 'Invalid input: hours, minutes, or seconds are undefined' });
  }

  const X = Math.floor(minutes / 10);
  const Y = minutes % 10;
  let series = [Y, X];
  for (let i = 2; i < seconds + 2; i++) {
    series.push(series[i-1] + series[i-2]);
  }

  res.json({
    seeds: { X, Y },
    numberCount: seconds,
    generationTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    fibonacciSeries: series.reverse()
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});