const express = require('express');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

console.log(process.env.DB_LOGIN);
const uri = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@clustersolutiscourse.vamb7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
let db;

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err);
  db = client.db(process.env.DB_NAME);

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/show', (req, res) => {
  db.collection(process.env.DB_SCHEMA)
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render('show.ejs', { data: results });
    });
});

app.post('/show', (req, res) => {
  db.collection(process.env.DB_SCHEMA).insertOne(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('Saved on Database');
    res.redirect('/show');
  });
});

app
  .route('/edit/:id')
  .get((req, res) => {
    const id = req.params.id;

    db.collection(process.env.DB_SCHEMA)
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        res.render('edit.ejs', { data: result });
      });
  })
  .post((req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const surname = req.body.surname;

    db.collection(process.env.DB_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          surname,
        },
      },
      (err, result) => {
        if (err) return res.sender(err);
        res.redirect('/show');
        console.log('Database Updated');
      },
    );
  });

app.route('/delete/:id').get((req, res) => {
  const id = req.params.id;

  db.collection(process.env.DB_SCHEMA).deleteOne(
    { _id: ObjectId(id) },
    (err, result) => {
      if (err) return res.send(500, err);
      console.log('User deleted from the Database!');
      res.redirect('/show');
    },
  );
});
