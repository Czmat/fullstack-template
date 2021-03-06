const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/api/users', (req, res, next) => {
  db.readUsers()
    .then(users => res.send(users))
    .catch(next);
});

const port = process.env.PORT || 3000;

db.sync()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(ex => console.log(ex));
