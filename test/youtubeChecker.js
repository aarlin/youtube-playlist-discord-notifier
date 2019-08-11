const rp = require('request-promise');


let part = 'snippet';
let maxResults = 5;
let playlistId = 'PLqP2A2xeRzdTO1h2soPovGa0UHcYEzsP5';
let key = 'YOUTUBE API KEY';
let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&maxResults=${maxResults}&playlistId=${playlistId}&key=${key}`;
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
    url: url
};
console.log(options);

let playlistVideos = []

// rp(options).then(response => {
//     console.log(response);
// });

rp(options).then(response => {
    let parsedResponse = JSON.parse(response);
    let items = parsedResponse.items.map(item => {

    });
    playlistVideos.push(items.map(item => {
        return new Object(item.snippet.title, '', item.snippet.title, item.snippet.thumbnails.default.url, item.snippet.publishedAt);
    }));
    console.log(playlistVideos)
});


    // .map(item => {
    // let video = new PlaylistVideo(item.snippet.title, '', item.snippet.title, item.snippet.thumbnails.default.url, item.snippet.publishedAt);
    // console.log(video);

