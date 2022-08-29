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
    console.error(err);
  }
}
module.exports = { getDadJokes };
