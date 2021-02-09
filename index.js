let apiURL = "https://api.lyrics.ovh";
function Executer(){
    let search = document.getElementById('song-name');
    let submitButton = document.getElementById('submit-button');
    let result = document.getElementById('result');
    

    let searchValue = search.value.trim();
    if(!searchValue){
        alert("Oops..You missed to enter song or singer!!!\nPlease enter either of them.");
    } 
    else{
        searchSong(searchValue);
    }
}

async function searchSong(searchValue){
    const searchResult = await fetch(apiURL+"/suggest/"+searchValue);
    const data = await searchResult.json();
    displayData(data);
}

function displayData(data) {
    result.innerHTML = `
      <ul class="song-list">
        ${data.data
          .map(
            (song) => `<li>
                      <div>
                          <strong>${song.artist.name}</strong> -${song.title} 
                      </div>
                      <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                  </li>`
          )
          .join("")}                
      </ul>
    `;
  } //Join is used to concat the list based on inverted commas.

  result.addEventListener("click", (e) => {
    const clickedElement = e.target;
  
    if (clickedElement.tagName === "SPAN") {
      const artist = clickedElement.getAttribute("data-artist");
      const songTitle = clickedElement.getAttribute("data-songtitle");
  
      getLyrics(artist, songTitle);
    }
  });
  
  async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
      <p>${lyrics}</p>`;
  }
  