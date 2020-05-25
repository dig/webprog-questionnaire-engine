const express = require('express'),
      path = require('path');

const port = process.env.PORT || 80;
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
console.log('[EXPRESS] Serving /public.');

app.listen(port);
console.log(`[EXPRESS] Listening on port ${port}.`);