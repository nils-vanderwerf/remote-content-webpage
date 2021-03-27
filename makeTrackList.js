//Seperate JS File
//Create a new track object and attach it to the list

class Track {
    constructor(thisTrack) {
        this.link = thisTrack.external_urls.spotify;
        this.cover = thisTrack.album.images[1].url; //album cover, the 300px sized one
        this.track = thisTrack.name;
        this.artist = thisTrack.artists[0].name;
        this.album = thisTrack.album.name;
        this.audio = thisTrack.preview_url
    }
    makeList() {
        //Create an li for each track and append it to the ul
        let resultsList = document.getElementById('results-list')

        let trackContainer = document.createElement('li');
        trackContainer.classList.add('track');
        resultsList.appendChild(trackContainer);

        //Div container which houses album cover, title(h2), artist (h3) and album name (h3)
        let innerDiv = document.createElement('div');
        innerDiv.classList.add('inner-div');
        trackContainer.appendChild(innerDiv)
        
        //Create and append album cover
        //Put the album cover inside the link
        attachAlbumCover(this.album, this.link, this.cover, innerDiv)

        //Create and append track name
        attachTrack(this.track, innerDiv)

        //Create and append artist name
        attachArtist(this.artist, innerDiv)

        //Create and append artist name
        attachAlbumName(this.album, innerDiv)

        //create an audio tag
        attachAudioSample(this.audio, trackContainer)
    }

}