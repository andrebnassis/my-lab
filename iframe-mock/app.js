/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');

const port = 8400;
const app = express();

app.use(express.static('iframe-mock/public'));

console.log(`Mock Iframe is up and running at: http://localhost:${port}`);
app.listen(port);
