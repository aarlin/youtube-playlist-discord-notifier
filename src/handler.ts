
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import * as dotenv from "dotenv";
import * as rp from 'request-promise';
import { PlaylistVideo } from '../playlist-video.model';

dotenv.config();

const youtubePlaylistChecker = (_event : APIGatewayEvent, _context : Context, callback : Callback) => {
    let part = 'snippet';
    let maxResults = process.env.MAX_RESULTS;
    let playlistId = process.env.PLAYLIST_ID;
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&maxResults=${maxResults}&playlistId=${playlistId}&key=${process.env.YOUTUBE_API}`;
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        url: url
    };
    
    let playlistVideos: PlaylistVideo[];
    rp(options).then(response => {
        let parsedResponse = JSON.parse(response);
        let playlistVideos = parsedResponse.items.map(item => {
            return new PlaylistVideo(item.snippet.title, '', item.snippet.title, item.snippet.thumbnails.default.url, item.snippet.publishedAt);
        });

        let latestVideo = playlistVideos[0];
        let postOptions = {
            'uri': process.env.DISCORD_WEBHOOK,
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': latestVideo.toJson()
        };

        rp(postOptions);

    });
    callback(undefined, { body: `Returned with ${playlistVideos.length} galleries` });

}

export { youtubePlaylistChecker }