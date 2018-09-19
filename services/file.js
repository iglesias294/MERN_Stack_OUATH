//write a function to retrieve a blob of json
//make an ajax request! use the 'fetch' function
//MEMORIZE THIS


//http://rallycoding.herokuapp.com/api/music_albums


// function fetchAlbums() {
//     fetch('http://rallycoding.herokuapp.com/api/music_albums')//fetch resolves its promise with an object representing the request
//         .then(res => res.json()) //get the real json response, which returns another promise
//         .then(json => console.log(json)) //take that final response and do whatever with it 
// }

// async function fetchAlbums() {
//     const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
//     const json =  await res.json()   
// }

//arrow function version
const fetchAlbums = async () => {
    const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json()
}

fetchAlbums();