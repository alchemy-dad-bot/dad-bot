

async function getDadHelp(query) {
  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.YOUTUBE_CHANNEL_ID}&q=${query}`, {
      headers: { 
        Accept: 'application/json',
        key: process.env.YOUTUBE_API_KEY
      }
    });
    const search = await res.json();
      
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return search;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

module.exports = { getDadHelp };
