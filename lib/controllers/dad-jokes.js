const { Router } = require('express');
// const fetch = require('cross-fetch');
const { getDadJokes } = require('../../data/dad-jokes-data');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const jokes = await getDadJokes();
      res.json({ id: jokes.id, joke: jokes.joke });
    } catch (e) {
      next(e);
    } 
  }
  );
