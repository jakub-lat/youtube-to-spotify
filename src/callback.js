(async () => {
    document.body.innerHTML = `
        <style>
            body {
                font-family: sans-serif;
                padding: 3em;
            }
            h1, h2, h3, p {
                margin-bottom: 0.3em;
            }
        </style>
        <h1>YouTube to Spotify</h1>
    `;

    document.title = 'Logging in';

    const params = new URLSearchParams(window.location.hash.substring(1));
    const spotifyToken = params.get('access_token');

    if(!spotifyToken) {
        document.body.innerHTML += '<h2>Login error</h2><p>You can close this tab.</p>';
        return;
    }

    await chrome.storage.local.set({ spotifyToken });


    document.body.innerHTML += '<h2>Login success</h2><p>You can close this tab.</p>';
})();

