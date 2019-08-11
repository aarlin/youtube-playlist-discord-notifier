# Youtube Playlist Checker and Discord Poster
AWS Lambda + Typescript + Cron + Youtube API + Discord Webhooks
When IFTTT and Zapier are not enough  
Set up a cron job for posting on a Discord channel  

Built from this template: https://github.com/aarlin/discord-lambda

# Installation
```
npm install
```

```
npm i serverless -g
```


```
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
```

Create a `.env` file that holds the webhook URL for Discord
```
DISCORD_WEBHOOK=<YOUR WEBHOOK>
YOUTUBE_API=<YOUR YOUTUBE API>
MAX_RESULTS=<MAX RESULTS>
PLAYLIST_ID=<YOUTUBE PLAYLIST ID>
```

## Start Service

To deploy to AWS
```
sls deploy -v
```

To run locally after deploying to AWS
```
sls invoke local -f cron
```

To see the cost usage
```
serverless logs --function <function> --tail
```

## Remove Service

```
sls remove 
```

## Debugging

This is a sample `launch.json` file you should have if you are using Visual Studio Code
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug API Gateway",
            "program": "${workspaceFolder}/node_modules/serverless/bin/serverless",
            "args": [
                "offline",
                "start"
            ]
        }
    ]
}
```

Press F5 to start debugging

## References

https://developers.google.com/youtube/v3/docs/playlistItems/list

https://console.developers.google.com/apis/dashboard

