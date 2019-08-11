
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import * as dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

const youtubePlaylistChecker = (_event : APIGatewayEvent, _context : Context, callback : Callback) => {
    let part = 'snippet%2CcontentDetails';
    let maxResults = 5;
    let playlistId = 'PLqP2A2xeRzdT01h2soPovGa0UHcYEzsP5';
    let url = `https://www.gogogleapis.com/youtube/v3/playlistItems?part=${part}&maxResults=${maxResults}&playlistId=${playlistId}&key=${process.env.YOUTUBE_API}`;
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.YOUTUBE_API}` 
        },
        url: url
    };
    axios(options);
    callback(undefined, null);

}


const postMessage = (_event : APIGatewayEvent, _context : Context, callback : Callback) => {
  let content = 'Testing new message'
    var requestPromise = require('minimal-request-promise'),
        options = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content
            })
        };

    requestPromise.post(process.env.DISCORD_WEBHOOK, options).then(
        function (response: any) {
            callback(undefined, response);
            console.log('got response', response.body, response.headers);
        },
        function (response: any) {
            console.log('got error', response.body, response.headers, response.statusCode, response.statusMessage);
        }
    );
}

export { postMessage, youtubePlaylistChecker }