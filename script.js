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
    'favourite fictional place you\’d want to visit?',
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
    "favourite Christmas present you\'ve ever received?",
    'favourite superhero?',
    'favourite video game?',
    'favourite quote?',
    'favourite department store?',
    'favourite place to shop?',
    'favourite store in the mall?',
    'favourite perfume/cologne?',
    'favourite occasion to dress up for?',
    'favourite hairstyle?',
    'favourite outfit you have?',
    'favourite soap scent?',
    'favourite article of clothing?',
    'favourite luxury brand?',
    'favourite brand of toilet paper?',
    'favourite candle scent?',
    'favourite extracurricular activity?',
    'favourite day of the week?',
    'favourite holiday?',
    'favourite kind of house?',
    'favourite baby boy name?',
    'favourite baby girl name?',
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

let freshQuestions = questions.slice();

function generateRandomQuestion() {
    //pick a random value from the array of fresh questions
    let random = Math.floor(Math.random() * freshQuestions.length);
    
    //capture the random element chosen
    let thisElement = freshQuestions[random];

    //remove it so its not chosen again
    freshQuestions.splice(random, 1)

    //If we run out of questions, reset it to the original array
    if (freshQuestions.length === 0) {
        freshQuestions = questions;
    }
    return thisElement
}

document.addEventListener('DOMContentLoaded', function(){
    setInputText();
})

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
    let searchVal = document.getElementById('search').value;
    searchQuery(searchVal, accessToken);
    document.getElementById('search').value = ''
    document.getElementById('search').setAttribute('placeholder', `What is your ${generateRandomQuestion()}`) = 
    document.getElementById('search').style.color = '#fff'
});

//Using access token in getdata.js
function searchQuery(searchValue, token) {

    const form = document.getElementById('spotify-form');
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
            //Use returned list to populate a ul
            console.log(data);
            
 //Filter out duplicates i.e tracks with the same artist
  //https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
           const filteredData = filterDuplicates(data.tracks.items)

    //Sort according to popularity
  //https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
            const sortedData = filteredData.sort(sortByPopularity)
            console.log(sortedData)
            populateList(sortedData)
            })


        .catch(error => {
            console.log(error);
        });
    }
}

function filterDuplicates(itemsArray) {
    itemsArray = itemsArray.filter((item, index, self) =>
    index === self.findIndex((i) => (
        i.artists[0].name === item.artists[0].name
    )
)
)
return itemsArray;
}

function sortByPopularity(a, b) {
    const itemA = a.popularity 
    const itemB = b.popularity 

    let comparison = 0;

    if (itemA > itemB) {
        comparison = 1
    } else if (itemA < itemB) {
        comparison = -1
    }
    return comparison * -1
}



    //Create a new track object and attach it to the list
    class Track {
        constructor(thisTrack) {
            this.link = thisTrack.external_urls.spotify;
            this.cover = thisTrack.album.images[1].url; //album cover, the 300px sized one
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
            
            //make a link which opens externally for the spotify tracks
            let thisLink = document.createElement('a')
            thisLink.setAttribute('href', this.link); //Sets the link to open Spotify
            thisLink.setAttribute('target', '_blank'); //opens in a new window
            trackContainer.appendChild(thisLink);

            //Create and append album cover
            let thisCover = document.createElement('img')
            thisCover.setAttribute('src', this.cover); //Sets the source attribute for image, the image url returned from Spotify
            thisCover.setAttribute('alt', this.album); //Sets the alt attribute to the album name
            thisLink.appendChild(thisCover); //Puts album cover inside link elemnent so it opends when you click on it

            //Create and append track name
            let trackNameElement = document.createElement('h2')
            trackNameElement.innerHTML = this.track
            trackContainer.appendChild(trackNameElement)

            //Create and append artist name
            let artistNameElement = document.createElement('h3')
            artistNameElement.innerHTML = this.artist
            trackContainer.appendChild(artistNameElement)

            //Create and append artist name
            let albumNameElement = document.createElement('h3')
            albumNameElement.innerHTML = this.album
            trackContainer.appendChild(albumNameElement)
        }

    }

    function populateList(results) {
        console.log(results);
        results.forEach(track => {
            let newTrack = new Track(track)
             newTrack.makeList();
        });
    }