# Youtube Playlist Checker and Discord Poster
Scheduled checker for new videos in specified Youtube playlist  
Set up a cron job for posting on a Discord channel    

When IFTTT and Zapier are not enough  
Schedule more frequent checks on playlist or on a specified time  

Built from this template: https://github.com/aarlin/discord-lambda  

# Credentials

Follow these links for serverless and Youtube credentials  

https://serverless.com/framework/docs/providers/aws/guide/credentials/    
https://elfsight.com/help/how-to-get-youtube-api-key/    

# Installation

1. Install Node.js: https://nodejs.org/en/  

2. Clone this repository  

3. ```npm install```

4. ```npm i serverless -g```

5. ```serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY```

6. Create a `.env` file that holds the webhook URL for Discord
    ```
    DISCORD_WEBHOOK=<YOUR WEBHOOK>
    YOUTUBE_API=<YOUR YOUTUBE API>
    MAX_RESULTS=<MAX RESULTS>
    PLAYLIST_ID=<YOUTUBE PLAYLIST ID>
    ```

7. Change `serverless.yml` events schedule to match your frequency of checks. Note that this is in UTC timezone  

# Start Service

To deploy to AWS
```
sls deploy -v
```

To run locally after deploying to AWS
```
sls invoke local -f youtube
```

To see the cost usage
```
serverless logs --function <function> --tail
```

# Remove Service

```
sls remove 
```

# Technologies
* AWS Lambda with Serverless framework  
* Typescript  
* Youtube API  

# References

https://developers.google.com/youtube/v3/docs/playlistItems/list

https://console.developers.google.com/apis/dashboard

