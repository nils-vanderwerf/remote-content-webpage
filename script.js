console.log(_accessToken)
//Global variable, otherwise it resets each time generateRandom question is called
let freshQuestions = questions.slice(); 

let searchVal; //needs to be a global variable so it can be accessed outside ofg event
let sortedData;
let sortByValue = document.getElementById('sortBy').value

let sortBy = document.getElementById('sortBy')

sortBy.addEventListener('change', function(){

    sortByValue = document.getElementById('sortBy').value
        document.getElementById("results-list").innerHTML = ""
        if (sortByValue === 'relevance') {
            console.log('searchValue: ', searchVal)
            console.log('sort by relevance:', sortByRelevance(sortedData, searchVal))
            sortedData = sortByRelevance(sortedData, searchVal)
            populateList(sortedData)
        }
        else if (sortByValue === 'popularity') {
            console.log('searchValue: ', searchVal)
            console.log('sort by popularity:', sortedData.sort(sortByPopularity))
            sortedData = sortedData.sort(sortByPopularity)
            populateList(sortedData)
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



function sortByPopularity(a, b) {
    const itemA = a.popularity 
    const itemB = b.popularity 

    return itemB - itemA

    // if (itemA > itemB) {
    //     comparison = 1
    // } else if (itemA < itemB) {
    //     comparison = -1
    // }
    // //Highest popularity number to lowest
    // console.log (comparison *-1)
    // return comparison * -1
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
    searchQuery(searchVal, _accessToken); //fetch data
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

    if (results.length === 0) {
        let container = document.getElementById('container')
        let para = document.createElement('p');
        let textNode = "No results for this search term"
        para.innerHTML = textNode
        container.appendChild(para)

    }
    results.forEach(track => {
        let newTrack = new Track(track)
            newTrack.makeList();
    });
}