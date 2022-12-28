const CLIENT_ID = '1eb931b0ef6e4869b9b63838dafa8081';
const REDIRECT_URI = 'https://www.youtube.com/yt2spotify-callback';

(async () => {
    const { spotifyToken } = await chrome.storage.local.get(["spotifyToken"]);
    loginStatus.style.visibility = 'visible';
    login.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-modify-playback-state`;

    logout.addEventListener('click', async () => {
        await chrome.storage.local.set({ spotifyToken: null });
        window.location.reload();
    });

    const profile = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${spotifyToken}` }
    }).then(r => r.json()).catch(() => null);

    if(!profile || profile.error) {
        loggedIn.style.display = 'none';
        return;
    }

    login.style.display = 'none';
    username.innerText = profile.display_name;

})();

