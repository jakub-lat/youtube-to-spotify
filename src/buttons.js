const buttonTemplate = (id, text) => `
<button
    id="${id}"
    class="yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading"
    style="display: flex;
        float: right;
        gap: 7px;
        padding-left: 10px;
        padding-right: 15px;
        margin-left: 5px;"
>
    <svg style="width: 24px; height: 24px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="50px" height="50px" fill-rule="nonzero"><g fill="#fffcfc" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25.009,1.982c-12.687,0 -23.009,10.322 -23.009,23.009c0,12.687 10.322,23.009 23.009,23.009c12.687,0 23.009,-10.321 23.009,-23.009c0,-12.688 -10.322,-23.009 -23.009,-23.009zM34.748,35.333c-0.289,0.434 -0.765,0.668 -1.25,0.668c-0.286,0 -0.575,-0.081 -0.831,-0.252c-2.473,-1.649 -6.667,-2.749 -10.167,-2.748c-3.714,0.002 -6.498,0.914 -6.526,0.923c-0.784,0.266 -1.635,-0.162 -1.897,-0.948c-0.262,-0.786 0.163,-1.636 0.949,-1.897c0.132,-0.044 3.279,-1.075 7.474,-1.077c3.5,-0.002 8.368,0.942 11.832,3.251c0.69,0.46 0.876,1.391 0.416,2.08zM37.74,29.193c-0.325,0.522 -0.886,0.809 -1.459,0.809c-0.31,0 -0.624,-0.083 -0.906,-0.26c-4.484,-2.794 -9.092,-3.385 -13.062,-3.35c-4.482,0.04 -8.066,0.895 -8.127,0.913c-0.907,0.258 -1.861,-0.272 -2.12,-1.183c-0.259,-0.913 0.272,-1.862 1.184,-2.12c0.277,-0.079 3.854,-0.959 8.751,-1c4.465,-0.037 10.029,0.61 15.191,3.826c0.803,0.5 1.05,1.56 0.548,2.365zM40.725,22.013c-0.373,0.634 -1.041,0.987 -1.727,0.987c-0.344,0 -0.692,-0.089 -1.011,-0.275c-5.226,-3.068 -11.58,-3.719 -15.99,-3.725c-0.021,0 -0.042,0 -0.063,0c-5.333,0 -9.44,0.938 -9.481,0.948c-1.078,0.247 -2.151,-0.419 -2.401,-1.495c-0.25,-1.075 0.417,-2.149 1.492,-2.4c0.185,-0.043 4.573,-1.053 10.39,-1.053c0.023,0 0.046,0 0.069,0c4.905,0.007 12.011,0.753 18.01,4.275c0.952,0.56 1.271,1.786 0.712,2.738z"></path></g></g></svg>
    <span>${text}</span>
</button>
`;


function elementFromHTML(html) {
    const temp = document.createElement('template');
    temp.innerHTML = html.trim();
    return temp.content.firstChild;
}

async function waitForElement(selector) {
    let el = null;
    while (!el) {
        el = document.querySelector(selector);
        await sleep(500);
    }
    return el;
}


(async () => {
    await getToken();

    const playButton = elementFromHTML(buttonTemplate('spotifyPlay', 'Play'));
    const queueButton = elementFromHTML(buttonTemplate('spotifyAddToQueue', 'Add to queue'));

    const title = await waitForElement('h1.style-scope.ytd-watch-metadata');
    title.appendChild(playButton);
    title.appendChild(queueButton);

    playButton.addEventListener('click', async () => {
        let song = await getSong(document.title);
        if(!song) return;

        window.open(song.uri);
//        play(song);
        document.querySelector('button.ytp-play-button.ytp-button').click();
    });

    queueButton.addEventListener('click', async () => {
        let song = await getSong(document.title);
        if(!song) return;

        await addToQueue(song.uri);
    });
})();