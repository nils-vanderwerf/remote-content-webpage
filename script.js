let _accessToken;
const _clientId = '16816dc28118429aad94cb9c64ee01c2'; // Your client id
const _clientSecret = 'd34aa51bb8b6412a9a7dbd7eb776e585'; // Your secret
 
//IFE which retrieves token
let getToken = function(){
    
     fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(_clientId + ':' + _clientSecret)
        },
        body: 'grant_type=client_credentials'
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        JSON.stringify(data);
        _accessToken = data.access_token;

    })
    .catch((error) => {
        console.log(error);
        let container = document.getElementById('spotify-container')
        let errorMsg = document.createElement('p')
        errorMsg.innerHTML('Error: unable to process results')
        container.appendChild(errorMsg);
    })
    }();

console.log('Access token is', _accessToken)
let questions = [
    'favourite cereal?',
    'favourite breakfast food?',
    'favourite pizza topping/s?',
    'favourite fruit?',
    'favourite vegetable?',
    'favourite dessert?',
    'favourite food?',
    'favourite cultural cuisine?',
    'favourite cake?',
    'favourite alcoholic drink?',
    'favourite coffee order?',
    'favourite cartoon cat?',
    'favourite movie?',
    'favourite country you’ve visited?',
    'country you most want to visit?',
    'favourite place to go with family?',
    'favourite vacation you’ve taken?',
    'favourite fictional place you’d want to visit?',
    'favourite thing about traveling?',
    'favourite dinosaur?',
    'favourite breed of dog?',
    'favourite season?',
    'your favourite flower?',
    'favourite animal?',
    'favourite native animal?',
    'animal that you wish was native to your country?',
    'favourite type of bear?',
    'favourite reptile?',
    'your favourite bird?',
    'favourite way to spend a rainy day?',
    'favourite way to spend a sunny day?',
    'favourite sea creature?',
    'favourite small mammal?',
    'favourite big cat?',
    'favourite wild animal?',
    'favourite sport?',
    'favourite childhood memory?',
    'favourite board game?',
    'favourite children’s show?',
    'favourite toy as a child?',
    'opinion of the best age of your life?',
    "favourite Christmas present you've ever received?",
    'favourite superhero?',
    'favourite video game?',
    'favourite quote?',
    'favourite place to shop?',
    'favourite perfume/cologne?',
    'favourite occasion to dress up for?',
    'favourite hairstyle?',
    'favourite outfit you have?',
    'favourite soap scent?',
    'favourite article of clothing?',
    'favourite luxury brand?',
    'favourite candle scent?',
    'favourite extracurricular activity?',
    'favourite day of the week?',
    'favourite holiday?',
    'favourite kind of house?',
    'favourite boy\'s name?',
    'favourite girl\'s name?',
    'favourite celebrity?',
    'favourite hobby?',
    'favourite way to cheer you up?',
    'favourite hobby?',
    'favourite kind of gift to receive?',
    'favourite crafty thing to make?',
    'favourite way to relax?',
    'favourite musical',
    'recommended way to solve a dispute',
    'solution to climate change'
]

//Global variable, otherwise it resets each time generateRandom question is called
let freshQuestions = questions.slice(); 

let searchVal; //needs to be a global variable so it can be accessed outside ofg event
let sortedData;
let sortByValue = document.getElementById('sortBy').value
console.log('The value of sortBy is', sortByValue)
let sortBy = document.getElementById('sortBy')

sortBy.addEventListener('change', function(){
    sortByValue = document.getElementById('sortBy').value
        if (document.getElementById("results-list").innerHTML !== "") {
        if (sortByValue === 'relevance') {
            populateList(sortedData)
        }
        else if (sortByValue === 'popularity') {
            populateList(sortedData)
        }
    }
})

function generateRandomQuestion() {
    
    //pick a random value from the array of fresh questions
    let random = Math.floor(Math.random() * freshQuestions.length);

    //capture the random element chosen
    let thisElement = freshQuestions[random];
    console.log(freshQuestions, random, thisElement)
    //remove it so its not chosen again
    freshQuestions.splice(random, 1)

    //If we run out of questions, reset it to the original array
    if (freshQuestions.length === 0) {
        freshQuestions = questions.slice();
    }
    return thisElement
}

document.addEventListener('DOMContentLoaded', function(){
    setInputText();
})


//Using access token in getdata.js
function searchQuery(searchValue, token) {

    //   const log = document.getElementById('log');
    //   form.addEventListener('submit', logSubmit);

    let searchBtn = document.getElementById('spotify-form');

    if (token != undefined) {
        //replace spaces with + signs as thats what url accepts for string
        let concatString = searchValue.split(' ').join('+');
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
            //change to a function for filterDuplicates, sortDatas
       
            //Filter out duplicates i.e tracks with the same artist
            //https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
           const filteredData = filterDuplicates(data.tracks.items)
           
            
            if (sortByValue === 'relevance') {
                sortedData = sortByRelevance(data.tracks.items, searchValue)
                populateList(sortedData);
            } 

            else if (sortByValue === 'popularity') {
                sortedData = filteredData.sort(sortByPopularity)
                populateList(sortedData)
            }
            //Sort according to popularity
            //https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
            // const sortedData = sortByRelevance(searchValue, data.tracks.items))
            populateList(sortedData)
            })

        .catch(error => {
            console.log(error);
        });
    }
}

//Sort according to popularity
//https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
function sortByPopularity(a, b) {
    const itemA = a.popularity 
    const itemB = b.popularity 

    let comparison = 0;

    if (itemA > itemB) {
        comparison = 1
    } else if (itemA < itemB) {
        comparison = -1
    }
    //Highest popularity number to lowest
    return comparison * -1
}


function sortByRelevance(results, input) {
    console.log(this)
    console.log('Our results are ', results)
    return results.map(entry => {
    let points = 0;
    let thisTitle = entry.name
    if (thisTitle.toLowerCase().includes(input.toLowerCase())) {
        points++
    }
    return {...entry, points};
}).sort((a,b) => b.points - a.points)
}


function setInputText() {
    let inputText = document.getElementById('search').setAttribute('placeholder', `What is your ${generateRandomQuestion()}`);
}
  
let searchBtn = document.getElementById('spotify-form')
let searchField = document.getElementById('search')

searchField.addEventListener('focus', function() {
document.getElementById('search').value  = ""
})

searchBtn.addEventListener('submit', function(event){
    event.preventDefault();
    document.getElementById("results-list").innerHTML = ""; //Remove all previous values before loading new ones
    searchVal = document.getElementById('search').value;
    searchQuery(searchVal, _accessToken);
    document.getElementById('search').value = ''
    document.getElementById('search').setAttribute('placeholder', `What is your ${generateRandomQuestion()}`)
});


function filterDuplicates(itemsArray) {
    itemsArray = itemsArray.filter((item, index, self) =>
    index === self.findIndex((i) => (
        i.artists[0].name === item.artists[0].name && i.name === item.name
    )
)
)
return itemsArray;
}


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
    let trackNameElement = document.createElement('h2')
    trackNameElement.innerHTML = track
    container.appendChild(trackNameElement)
}

function attachArtist(artist, container) {
    let artistNameElement = document.createElement('h3')
    artistNameElement.innerHTML = artist
    container.appendChild(artistNameElement)
}

function attachAlbumName(album, container) {
    let albumNameElement = document.createElement('h3')
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

function populateList(results) {
    console.log("function entered")
    results.forEach(track => {
        let newTrack = new Track(track)
            newTrack.makeList();
    });
}