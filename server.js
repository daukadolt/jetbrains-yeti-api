require('dotenv/config');

const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.connect(process.env.MONGO_PROD_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const expressPort = process.env.EXPRESS_PORT;
        app.listen(expressPort, () => { console.log(`Yeti is up and running on port ${expressPort}`); });
    })
    .catch((err) => {
        console.error('Error: mongoose could not connect');
        console.error(err);
        process.exit(-1);
    });
