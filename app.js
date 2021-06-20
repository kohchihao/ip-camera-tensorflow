const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

const { proxy, scriptUrl } = require('rtsp-relay')(app);

const handler = proxy({
  url: process.env.RTSP_URL,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
});

// the endpoint our RTSP uses
app.ws('/api/stream', handler);

// this is an example html page to view the stream
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/dummy.html')));

app.listen(2000);
