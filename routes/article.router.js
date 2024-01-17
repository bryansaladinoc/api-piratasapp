const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.json('All News');
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', (req, res) => {
  try {
    res.status(201).json('All News');
  } catch (e) {
    console.log(e);
  }
});

router.put('/:id', (req, res) => {
  try {
    res.json('All News');
  } catch (e) {
    console.log(e);
  }
});

router.post('/', (req, res) => {
  try {
    res.json('All News');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
