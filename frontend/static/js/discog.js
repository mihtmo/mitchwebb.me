// Fill gallery with album art, descriptions, and links using discog CSV data
function createDiscogGallery(discogData, discCount) {
    let albumArt = null;
    for (let i = 1; i < discCount; i++) {
        newAlbum = document.createElement('a');
        // Give newAlbum link
        newAlbum.setAttribute('href', `${discogData[i][5]}`);
        newAlbum.setAttribute('target', '_blank');
        newAlbum.setAttribute('rel', 'noopener noreferrer');
        // Name newAlbum IDs in order
        divIdName = 'album'+i;
        newAlbum.setAttribute('id', divIdName);
        newAlbum.setAttribute('class', 'album');
        // Include album image
        albumArt = document.createElement('img');
        albumArt.setAttribute('class', 'album-art');
        albumArt.setAttribute('alt', `album art for ${discogData[i][3]}`);
        albumArt.src  = `./images/${discogData[i][3]}`;
        albumArt.style.height = '15vw';
        // Attach descriptions for hover display
        albumDescription = document.createElement('p');
        albumDescription.setAttribute('class', 'album-description');
        albumDescription.innerHTML = 
            `
                ${discogData[i][1]}
                </br>
                ${discogData[i][2]}
                </br>
                ${discogData[i][4]}
            `;
        newAlbum.appendChild(albumArt);
        newAlbum.appendChild(albumDescription);
        document.querySelector("#discography").appendChild(newAlbum);
    }
}
