class Track {
    constructor(thisTrack) {
        this.link = thisTrack.external_urls.spotify;
        this.cover = thisTrack.album.images[0].url; //album cover, the 300px sized one
        this.track = thisTrack.name;
        this.artist = thisTrack.artists[0].name;
        this.album = thisTrack.album.name;
        this.audio = thisTrack.preview_url
    }
    makeList() {
        //Create an li for each track and append it to the ul
        let resultsList = document.getElementById('results-list')

        let trackContainer = document.createElement('li');
        trackContainer.className = 'track';
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

        //create an audio element
        attachAudioSample(this.audio, trackContainer)

       //create a like button
       createLikeButton(trackContainer)

    }
}

function createLikeButton(container) {
const heart = document.createElement('p')
heart.classList = "heart"
heart.innerHTML = emptyHeartText
container.appendChild(heart)

}

//Liker event listener function is in ./script.js file


//attaching the link and album cover is in same function, as the album cover requires the link
function attachAlbumCover(album, link, cover, container) {
    let thisLink = document.createElement('a')
    let thisCover = document.createElement('img')
    
    thisLink.setAttribute('href', link); //Sets the link to open Spotify
    thisLink.setAttribute('target', '_blank'); //opens in a new window
    container.appendChild(thisLink); //Puts album cover inside link elemnent so it opends when you click on it

    //Could put in new function? Would need to pass in this link, with attributes included
    thisCover.setAttribute('src', cover); //Sets the source attribute for image, the image url returned from Spotify
    thisCover.setAttribute('alt', album); //Sets the alt attribute to the album name
    thisLink.appendChild(thisCover); 

}

function attachTrack(track, container) {
    let trackNameElement = document.createElement('h3')
    trackNameElement.innerHTML = track
    container.appendChild(trackNameElement)
}

function attachArtist(artist, container) {
    let artistNameElement = document.createElement('h4')
    artistNameElement.innerHTML = artist
    container.appendChild(artistNameElement)
}

function attachAlbumName(album, container) {
    let albumNameElement = document.createElement('h4')
    albumNameElement.innerHTML = album
    container.appendChild(albumNameElement)
}

function attachAudioSample(audio, container) {
    if (audio !== null) {
        let audioObject = new Audio(audio)
        audioObject.setAttribute('type', `audio/mp3`)
        audioObject.setAttribute('controlsList', 'nodownload')
        audioObject.controls = true;
        audioObject.classList.add('sample')
        audioObject.volume = 0.6
        container.appendChild(audioObject)
    } else {
        let noAudioMsg = document.createElement('p')
        noAudioMsg.innerHTML = `<i>No audio preview available for this track.<br> Click on album cover above to hear full track.</i>`
        container.appendChild(noAudioMsg)
    }
}


