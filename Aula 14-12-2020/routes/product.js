const express = require('express');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectID;
const productRoutes = express.Router();

productRoutes.get('/product', (req, res) => {
  res.render('product/index.ejs');
});

productRoutes.get('/product/show', (req, res) => {
  db.collection(process.env.DB_PRODUCT_SCHEMA)
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render('product/show.ejs', { data: results });
    });
});

productRoutes.post('/product/show', (req, res) => {
  db.collection(process.env.DB_PRODUCT_SCHEMA).insertOne(
    req.body,
    (err, result) => {
      if (err) return console.log(err);

      console.log('Saved on Database');
      res.redirect('/product/show');
    },
  );
});

productRoutes.get('/product/edit/:id', (req, res) => {
  const id = req.params.id;

  db.collection(process.env.DB_PRODUCT_SCHEMA)
    .find(ObjectId(id))
    .toArray((err, result) => {
      if (err) return res.send(err);
      res.render('product/edit.ejs', { data: result });
    });
});
productRoutes.post('/product/edit/:id', (req, res) => {
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

productRoutes.get('/product/delete/:id', (req, res) => {
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

module.exports = productRoutes;
