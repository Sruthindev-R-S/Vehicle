const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT || 3000;

app.use('/', require('./routes/routes'));
// app.use('/',require('./test_routes/inserting'))

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port} (Accessible on mobile via http://192.168.29.216:${port})`);
});