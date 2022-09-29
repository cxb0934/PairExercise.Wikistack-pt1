const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const { Page } = require("../models");

router.get("/", (req, res, next) => {
  res.send("one");
})

router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  try {
    const page = await Page.create({
      title: title,
      content: content
    });

    res.redirect('/');
  } catch (error) { next(error) }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', (req, res, next) => {
  res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
