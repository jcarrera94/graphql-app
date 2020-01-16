const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
  "mongodb+srv://jcarrera94:Abcd0192837465@jcarrera94-ctzdh.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("connected to db"))
.catch(err => console.error(err.message));

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3000, () => {
  console.log('now listening on port 3000');
})