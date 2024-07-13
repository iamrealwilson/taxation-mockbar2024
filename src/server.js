// server.js
const express = require('express');
const cors = require('cors');
const questionRouter = require('./questionRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));