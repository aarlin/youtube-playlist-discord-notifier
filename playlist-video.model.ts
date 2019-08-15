export class PlaylistVideo {
    constructor(public title: string, public url: string, public description: string, public thumbnail: string, public publishedAt: Date | string) {
    }

    toDiscordEmbedFormat() {
        return JSON.stringify({ 
            'embeds' : [{
                'title': this.title,
                'url': this.url,
                'description': this.description,
                'thumbnail': { 
                    'url': this.thumbnail 
                }
            }]
        });
    }
    
}