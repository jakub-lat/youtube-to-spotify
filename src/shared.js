const log = (...args) => console.log('[yt2spotify]', ...args);
const sleep = (t) => new Promise((r) => setTimeout(r, t));

async function getToken() {
    const { spotifyToken } = await chrome.storage.local.get(["spotifyToken"]);
    if (!spotifyToken) throw new Error('[yt2spotify] No spotify token!');
    return spotifyToken;
}

async function getSong(title) {
    const spotifyToken = await getToken();

    const songTitle = title.replace('- YouTube', '').replace(/\(([^\)]+)\)|\[([^\]]+)\]|ft\.[\d\D]*/g, '');

    const params = new URLSearchParams();
    params.append('q', songTitle);
    params.append('type', 'track');

    const {tracks} = await fetch('https://api.spotify.com/v1/search?' + params.toString(), {
        headers: {Authorization: `Bearer ${spotifyToken}`}
    }).then(r => r.json());

    const song = tracks.items[0];

    if (!song) {
        log('Spotify song not found!');
        return null;
    }

    log(`Found Spotify song: ${song.name}`);

    return song;
}

async function addToQueue(uri) {
    const spotifyToken = await getToken();
    await fetch('https://api.spotify.com/v1/me/player/queue?uri='+uri, {
        method: 'post',
        headers: {Authorization: `Bearer ${spotifyToken}`}
    });
}

async function play(song) {
    const spotifyToken = await getToken();
    await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'put',
        body: JSON.stringify({ uris: [ song.uri ] }),
        headers: {Authorization: `Bearer ${spotifyToken}`}
    });
}