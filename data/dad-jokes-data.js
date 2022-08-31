const fetch = require('cross-fetch');

async function getDadJokes() {
  try {
    const res = await fetch('http://icanhazdadjoke.com', {
      headers: { 
        Accept: 'application/json'
      }
    });
    const dadJoke = await res.json();
    
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return dadJoke;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

async function searchDadJokes(content) {
  try {
    const res = await fetch(`https://icanhazdadjoke.com/search?term=${content}`, {
      headers: {
        Accept: 'application/json'
      }
    });
    const dadJoke = await res.json();
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return dadJoke;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

module.exports = { getDadJokes, searchDadJokes };
