function sortByPreference(data) {
    console.log(data, searchVal)
    sortByValue = document.getElementById('sortBy').value
           document.getElementById("results-list").innerHTML = ""
           if (sortByValue === 'relevance') {
               sortedData = sortByRelevance(data, searchVal)
               populateList(sortedData)
           }
           else if (sortByValue === 'popularity') {
               sortedData = data.sort(sortByPopularity)
               populateList(sortedData)
           }
   
           else if (sortByValue === 'alphabet') {
               sortedData = data.sort(sortAlphabetically)
               populateList(sortedData)
           }
   
           else if (sortByValue === 'alphabet-backwards') {
               sortedData = data.sort(sortAlphabetically)
               sortedData.reverse()
               populateList(sortedData)
           }
           return sortedData;
    }