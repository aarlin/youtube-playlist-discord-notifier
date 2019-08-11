
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import * as dotenv from "dotenv";
import * as rp from 'request-promise';
import { PlaylistVideo } from '../playlist-video.model';
import * as utils from '../utils';

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
        playlistVideos = parsedResponse.items.map(item => {
            let url = 'https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId;
            return new PlaylistVideo(item.snippet.title, url, url, item.snippet.thumbnails.default.url, item.snippet.publishedAt);
        });

        let latestVideo = playlistVideos[0];
        let latestVideoPublished = utils.removeTime(new Date(latestVideo.publishedAt));
        let currentDate = utils.removeTime(new Date());
        if (currentDate === latestVideoPublished) {
            let postOptions = {
                'uri': process.env.DISCORD_WEBHOOK,
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': latestVideo.toJson()
            };
    
            rp(postOptions);
            callback(undefined, { body: `New video found on scheduled check` });
        }
        callback(undefined, { body: `No video found on scheduled check` });
    });
    

}

export { youtubePlaylistChecker }