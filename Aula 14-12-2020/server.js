const express = require('express');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const expressLayouts = require('express-ejs-layouts');

const uri = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@clustersolutiscourse.vamb7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
let db;

const app = express();
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

MongoClient.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db(process.env.DB_NAME);

    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  },
);

app.get('/', (req, res) => {
  res.render('user/index.ejs');
});

app.get('/user/show', (req, res) => {
  db.collection(process.env.DB_USER_SCHEMA)
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render('user/show.ejs', { data: results });
    });
});

app.post('/user/show', (req, res) => {
  db.collection(process.env.DB_USER_SCHEMA).insertOne(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('Saved on Database');
    res.redirect('/user/show');
  });
});

app
  .route('/user/edit/:id')
  .get((req, res) => {
    const id = req.params.id;

    db.collection(process.env.DB_USER_SCHEMA)
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        res.render('user/edit.ejs', { data: result });
      });
  })
  .post((req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const surname = req.body.surname;

    db.collection(process.env.DB_USER_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          surname,
        },
      },
      (err, result) => {
        if (err) return res.sender(err);
        res.redirect('/user/show');
        console.log('Database Updated');
      },
    );
  });

app.route('/user/delete/:id').get((req, res) => {
  const id = req.params.id;

  db.collection(process.env.DB_USER_SCHEMA).deleteOne(
    { _id: ObjectId(id) },
    (err, result) => {
      if (err) return res.send(500, err);
      console.log('User deleted from the Database!');
      res.redirect('/user/show');
    },
  );
});

//****************PRODUCT******** */
app.get('/product', (req, res) => {
  res.render('product/index.ejs');
});


app.get('/product/show', (req, res) => {
  db.collection(process.env.DB_PRODUCT_SCHEMA)
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render('product/show.ejs', { data: results });
    });
});

app.post('/product/show', (req, res) => {
  db.collection(process.env.DB_PRODUCT_SCHEMA).insertOne(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('Saved on Database');
    res.redirect('/product/show');
  });
});

app
  .route('/product/edit/:id')
  .get((req, res) => {
    const id = req.params.id;

    db.collection(process.env.DB_PRODUCT_SCHEMA)
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        res.render('product/edit.ejs', { data: result });
      });
  })
  .post((req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;

    db.collection(process.env.DB_PRODUCT_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          price,
        },
      },
      (err, result) => {
        if (err) return res.sender(err);
        res.redirect('/product/show');
        console.log('Database Updated');
      },
    );
  });

app.route('/product/delete/:id').get((req, res) => {
  const id = req.params.id;

  db.collection(process.env.DB_PRODUCT_SCHEMA).deleteOne(
    { _id: ObjectId(id) },
    (err, result) => {
      if (err) return res.send(500, err);
      console.log('Product deleted from the Database!');
      res.redirect('/product/show');
    },
  );
});