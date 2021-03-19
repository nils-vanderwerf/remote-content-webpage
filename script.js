
/*
let accessToken;
let clientId = '16816dc28118429aad94cb9c64ee01c2'; // Your client id
let clientSecret = 'd34aa51bb8b6412a9a7dbd7eb776e585'; // Your secret
getToken();

//Change to a post request
function getToken() {
    fetch('https://accounts.spotify.com/api/token', {
       method: 'POST',
       headers: {
           'Content-Type' : 'application/x-www-form-urlencoded', 
           'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
       },
       body: 'grant_type=client_credentials'
       })
   .then((response) => {
       return response.json()
   })
   .then((data) => {
       JSON.stringify(data);
       accessToken = data.access_token;
       console.log(accessToken)
       searchBtn.addEventListener('submit', function(event){
           event.preventDefault();
           let searchVal = document.getElementById('search').value;
           searchQuery(searchVal, accessToken);
       });
   })
   .catch((error) => {
       console.log(error);
   })
   }
   */

let searchBtn = document.getElementById('spotify-form')

searchBtn.addEventListener('submit', function(event){
    event.preventDefault();
    let searchVal = document.getElementById('search').value;
    searchQuery(searchVal, accessToken);
});

//Using access token in getdata.js
function searchQuery(searchValue, token) {

const form = document.getElementById('spotify-form');
console.log(form)
//   const log = document.getElementById('log');
//   form.addEventListener('submit', logSubmit);

let searchBtn = document.getElementById('spotify-form');
console.log(searchBtn);

    console.log(token);
    if (token != undefined) {
    //replace spaces with + signs as thats what url accepts for string
    let concatString = searchValue.split(' ').join('+');
    console.log(searchValue, concatString);
    fetch(`https://api.spotify.com/v1/search?q=${searchValue}&offset=0&limit=20&type=track`, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        }
     })
    .then(response => {
        return response.json()
    })
    .then(data => {
        //Use returned list to populate a ul
        console.log(data);
        populateList(data)
    })
    .catch(error => {
        console.log(error);
    });
    }
    }

    //Create a new track object and attach it to the list
    class Track {
        constructor(thisTrack) {
            this.cover = thisTrack.album.images[0].url; //album cover
            this.track = thisTrack.name;
            this.artist = thisTrack.artists[0].name;
            this.album = thisTrack.album.name;
        }

        makeList() {
            //Create an li for each track and append it to the ul 
            let resultsList = document.getElementById('results-list')
            let trackContainer = document.createElement('li');
            trackContainer.classList.add('track');
            resultsList.appendChild(trackContainer);

            //Create and append album cover
            let thisCover = document.createElement('img')
            thisCover.setAttribute('src', this.cover); //Sets the source attribute for image, the image url returned from Spotify
            thisCover.setAttribute('alt', this.album); //Sets the alt attribute to the album name
            trackContainer.appendChild(thisCover);

            //Create and append track name
            let thisTrackName = document.createElement('h2')
            thisTrackName.innerHTML = this.track
            trackContainer.appendChild(thisTrackName)

            //Create and append artist name
            let thisArtistName = document.createElement('h3')
            thisArtistName.innerHTML = this.artist
            trackContainer.appendChild(thisArtistName)

            //Create and append artist name
            let thisAlbumName = document.createElement('h3')
            thisAlbumName.innerHTML = thisTrack.artists[0].name
            trackContainer.appendChild(thisAlbumName)
        }

    }

    function populateList(results) {

        let eachTrack = results.tracks.items;
        console.log(eachTrack);
        let trackObj = eachTrack.forEach(function(track) {
            let newTrack = new Track(track)
            return newTrack.makeList();
        });
        console.log(trackObj);
    }


