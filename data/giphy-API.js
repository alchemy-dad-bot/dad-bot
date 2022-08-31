const fetch = require('cross-fetch');

async function getGifs() {
  try {
    const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=dad+jokes&rating=pg-13`, {
      headers: {
        Accept: 'application/json'
      }
    });

    const dadGif = await res.json();

    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return dadGif;
  } catch (err) {
    //eslint-disable-next-line no-console
    console.error(err);
  }
}
module.exports = { getGifs };
