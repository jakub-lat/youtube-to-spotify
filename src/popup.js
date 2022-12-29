
(async () => {
    const { spotifyToken } = await chrome.storage.local.get(["spotifyToken"]);
    loginStatus.style.visibility = 'visible';
    login.href = LOGIN_URI;

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

