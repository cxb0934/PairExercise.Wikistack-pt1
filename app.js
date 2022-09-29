const morgan = require('morgan');
const express = require('express');
const { appendFile } = require('fs');
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

const app = express();

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({extended: false}));

app.use('/wiki', wikiRouter);

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

const PORT = 3000;

const init = async () => {
  await db.sync({force: true});

  app.listen(PORT, () => {
    console.log(`app listening import ${PORT}`);
  });
}

init();
