importScripts('shared.js');

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: 'Play',
        id: 'spotifyPlay',
        documentUrlPatterns: [ '*://*.youtube.com/*' ],
        contexts: [ 'link' ]
    });

    chrome.contextMenus.create({
        title: 'Add to queue',
        id: 'spotifyAddToQueue',
        documentUrlPatterns: [ '*://*.youtube.com/*' ],
        contexts: [ 'link' ]
    });
});

chrome.contextMenus.onClicked.addListener(async ({ menuItemId, linkUrl, ...rest }) => {
    const html = await fetch(linkUrl).then(x => x.text());
    const title = /<title>(.+)<\/title>/.exec(html)[1];

    const song = await getSong(title);

    if(menuItemId === 'spotifyPlay') {
        const tab = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        chrome.tabs.update(tab[0].id, {url: song.uri});
//        play(song);
    } else {
        await addToQueue(song.uri);
    }
});