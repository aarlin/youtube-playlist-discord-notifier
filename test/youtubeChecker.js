const rp = require('request-promise');

function getPlaylistVideos() {
    let part = 'snippet';
    let maxResults = 5;
    let playlistId = 'PLqP2A2xeRzdTO1h2soPovGa0UHcYEzsP5';
    let key = 'YOUR_YOUTUBE_API';
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
    
    rp(options).then(response => {
        let parsedResponse = JSON.parse(response);
        // let item = parsedResponse.items[0];
        playlistVideos.push(parsedResponse.items.map(item => {
            return new Object(item.snippet.title, '', item.snippet.title, item.snippet.thumbnails.default.url, item.snippet.publishedAt);
        }));
        console.log(playlistVideos)
    });
    
}

function getAverageUploadTime() {
    let part = 'snippet';
    let maxResults = 25;
    let playlistId = 'PLqP2A2xeRzdTO1h2soPovGa0UHcYEzsP5';
    let key = 'YOUR_API_KEY';
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
    
    rp(options).then(response => {
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        let totalTime = 0;
        let timeCount = 0;
        playlistVideos.push(parsedResponse.items.map(item => {
            console.log(item.snippet.publishedAt);
            let published = new Date(item.snippet.publishedAt);
            let hourAndMinutes = published.getUTCHours() * 60 + published.getUTCMinutes();
            totalTime += parseInt(hourAndMinutes);
            timeCount += 1;
    
        }));
        var avgTime = totalTime / timeCount;
        console.log(totalTime);

        console.log(avgTime);

    });

}

console.log(getAverageUploadTime());
console.log(getPlaylistVideos());

