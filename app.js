const express = require('express');

const app = express();
const port = 8888;

app.get('/', (req, res) => { res.send('App is working!'); });

app.listen(port, () => { console.log(`Yeti is up and running on port ${port}`); });
