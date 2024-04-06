// Collection of reused variable names
const openRecordWrapper = document.getElementById("open-record-wrapper");
const recordContainer = document.getElementById("record-container");
const rotateSleeveIcon = document.getElementById("rotate-sleeve-icon");
const rotateAlbumIcon = document.getElementById("rotate-album-icon");
const vinylFront = document.getElementById("vinyl-front");
const jacketThickness = document.getElementById("jacket-thickness");
const jacketFront = document.getElementById("jacket-front");
const jacketBack = document.getElementById("jacket-back");
const vinylLargeWrapper = document.getElementById("vinyl-large-wrapper");
const vinylFrontLarge = document.getElementById("vinyl-front-large");
const vinylBackLarge = document.getElementById("vinyl-back-large");
const jacketFrontLarge = document.getElementById("jacket-front-large");
const jacketBackLarge = document.getElementById("jacket-back-large");
const dummyContainer = document.getElementById("dummy-container");
const jacketBackSlider = document.getElementById("jacket-back-slider");
const vinylBackSlider = document.getElementById("vinyl-back-slider")
// const sleeveText = Array.from(document.getElementsByClassName("sleeve-text"));
// const singleLyricsText = document.getElementById("single-lyrics-text");
const bandcampPlayer = document.getElementById("bandcamp-player");
const albumInIcon = document.getElementById("album-in-icon");
const albumOutIcon = document.getElementById("album-out-icon");
const openRecordContainer = document.getElementById("open-record-container");
const openRecordRightWrapper = document.getElementById("open-record-right-wrapper");
const openRecordLeftWrapper = document.getElementById("open-record-left-wrapper");
const sleeveWrapper = document.getElementById("sleeve-wrapper");


// Attach event listeners
// recordContainer
recordContainer.addEventListener("mouseover", expandVinylFull);
recordContainer.addEventListener("mouseout", expandVinylSlight);
recordContainer.addEventListener("touchstart", expandVinylFull);
recordContainer.addEventListener("touchend", expandVinylSlight);
recordContainer.addEventListener("click", toLinerNotes);
// rotate-album-icon
rotateAlbumIcon.addEventListener("mouseover", retractVinyl);
rotateAlbumIcon.addEventListener("mouseout", expandVinylSlight);
rotateAlbumIcon.addEventListener("touchstart", expandVinylFull);
rotateAlbumIcon.addEventListener("touchend", retractVinyl);
rotateAlbumIcon.addEventListener("click", rotateRecord);
// album-out-icon
albumOutIcon.addEventListener("mouseover", expandVinylFull);
albumOutIcon.addEventListener("mouseout", expandVinylSlight);
albumOutIcon.addEventListener("touchstart", expandVinylFull);
albumOutIcon.addEventListener("touchend", expandVinylFull);
albumOutIcon.addEventListener("click", toLinerNotes);
// rotate-sleeve-icon
rotateSleeveIcon.addEventListener("click", rotateSleeve);
// album-in-icon
albumInIcon.addEventListener("click", returnToAlbumView);
albumInIcon.addEventListener("mouseover", closeJacket);
albumInIcon.addEventListener("mouseleave", openJacket);
albumInIcon.addEventListener("touchstart", closeJacket);
albumInIcon.addEventListener("touchend", openJacket);

// Give hoverable elements a 'hovering' class for mobile use
function addHover(element) {
    element.classList.add('hovering');
}

// Remove hoverable elements 'hovering' class
function removeHover(element) {
    element.classList.remove('hovering');
}

// Function for moving from outer album view to liner notes view
function toLinerNotes() {
    dummyContainer.classList.add("fadeout");
    rotateAlbumIcon.classList.add("fadeout");
    albumOutIcon.classList.add("fadeout");
    openRecordWrapper.classList.remove("fadeout");
    vinylFront.style.transform = "translateX(100vw)";
    jacketFront.style.transform = "translateX(-100vw)";
    jacketThickness.style.transform = "translateX(-100vw)";
    jacketBackSlider.style.transform = "translateX(100vw)";
    vinylBackSlider.style.transform = "translateX(-100vw)";
    // let threeButton = document.querySelector("#three-button");
    // threeButton.style.display = 'none';
    setTimeout(function() { 
        dummyContainer.style.display = "none"; 
        rotateAlbumIcon.style.display = "none";
        albumOutIcon.style.display = "none";
        openRecordWrapper.style.display = "flex"; 
        rotateSleeveIcon.style.display = "block"; 
        albumInIcon.style.display = "block"; 
        openRecordWrapper.classList.add("fadein");
        rotateSleeveIcon.classList.add("fadein");
        albumInIcon.classList.add("fadein");
    }, 1000);
    setTimeout(function() { 
        dummyContainer.classList.remove("fadeout"); 
        rotateAlbumIcon.classList.remove("fadeout"); 
        albumOutIcon.classList.remove("fadeout");
        openRecordWrapper.classList.remove("fadein");
        rotateSleeveIcon.classList.remove("fadein");
        albumInIcon.classList.remove("fadein"); 
    }, 2000);
}

// Hide vinyl on rotate icon hover
function retractVinyl() {
    recordContainer.classList.remove("expanded-slight");
    recordContainer.classList.remove("expanded-full");
}

// Show vinyl again
function expandVinylSlight() {
    recordContainer.classList.remove("expanded-full");
    recordContainer.classList.add("expanded-slight");
}

function expandVinylFull() {
    recordContainer.classList.remove("expanded-slight");
    recordContainer.classList.add("expanded-full");
}

// Close vinyl on back arrow hover
function closeJacket() {
    openRecordContainer.classList.add("closed");
}

// Open vinyl after back arrow hover
function openJacket() {
    openRecordContainer.classList.remove("closed");
}

// Rotate record jacket to see back/front
// This could be shorted and be done through CSS by adding class name
function rotateRecord() {
    if (recordContainer.classList.contains("isrotated")) {
        recordContainer.style.transform = "rotateY(0deg)";
        recordContainer.classList.remove("isrotated");
    }
    else {
        recordContainer.style.transform = "rotateY(180deg)";
        recordContainer.classList.add("isrotated");
    }
}

// Rotate inner sleeve to see back/front
function rotateSleeve() {
    // If already showing backside
    if (sleeveWrapper.classList.contains("isrotated")) {
        sleeveWrapper.style.transform = "rotateY(0deg)";
        sleeveWrapper.classList.remove("isrotated");
        jacketBackLarge.classList.add("fadeout");
        vinylBackLarge.classList.add("fadeout");
        setTimeout(function() { 
            openRecordLeftWrapper.style.zIndex = 5;
            openRecordRightWrapper.style.zIndex = -5;
            jacketBackLarge.style.display = "none"; 
            vinylBackLarge.style.display = "none";
            jacketFrontLarge.style.display = "block"; 
            vinylFrontLarge.style.display = "block"; 
            jacketFrontLarge.classList.add("fadein");
            vinylFrontLarge.classList.add("fadein");
        }, 1000);
        setTimeout(function() { 
            jacketBackLarge.classList.remove("fadeout"); 
            vinylBackLarge.classList.remove("fadeout"); 
            jacketFrontLarge.classList.remove("fadein");
            vinylFrontLarge.classList.remove("fadein");
        }, 2000);
    }
    // If showing frontside
    else {
        sleeveWrapper.style.transform = "rotateY(180deg)";
        sleeveWrapper.classList.add("isrotated");
        jacketFrontLarge.classList.add("fadeout");
        vinylFrontLarge.classList.add("fadeout");
        setTimeout(function() { 
            openRecordLeftWrapper.style.zIndex = -5;
            openRecordRightWrapper.style.zIndex = 5;
            jacketFrontLarge.style.display = "none"; 
            vinylFrontLarge.style.display = "none";
            jacketBackLarge.style.display = "block"; 
            vinylBackLarge.style.display = "block"; 
            jacketBackLarge.classList.add("fadein");
            vinylBackLarge.classList.add("fadein");
        }, 1000);
        setTimeout(function() { 
            jacketFrontLarge.classList.remove("fadeout"); 
            vinylFrontLarge.classList.remove("fadeout"); 
            jacketBackLarge.classList.remove("fadein");
            vinylBackLarge.classList.remove("fadein");
        }, 2000);
    }
}

// Return to album jacket view
function returnToAlbumView() {
    openRecordWrapper.classList.add("closed");
    openRecordWrapper.classList.add("fadeout");
    rotateSleeveIcon.classList.add("fadeout");
    albumInIcon.classList.add("fadeout");
    vinylFront.style.transform = "";
    jacketFront.style.transform = "";
    jacketThickness.style.transform = "";
    jacketBackSlider.style.transform = "";
    vinylBackSlider.style.transform = "";
    // let threeButton = document.querySelector("#three-button");
    // threeButton.style.display = 'block';
    setTimeout(function() { 
        openRecordWrapper.style.display = "none"; 
        rotateSleeveIcon.style.display = "none";
        albumInIcon.style.display = "none";
        dummyContainer.style.display = "flex"; 
        rotateAlbumIcon.style.display = "block"; 
        albumOutIcon.style.display = "block"; 
        dummyContainer.classList.add("fadein"); 
        rotateAlbumIcon.classList.add("fadein"); 
        albumOutIcon.classList.add("fadein"); 
    }, 1000);
    setTimeout(function() { 
        openRecordWrapper.classList.remove("fadeout"); 
        rotateSleeveIcon.classList.remove("fadeout"); 
        albumInIcon.classList.remove("fadeout");
        dummyContainer.classList.remove("fadein"); 
        rotateAlbumIcon.classList.remove("fadein");
        albumOutIcon.classList.remove("fadein");
        jacketFrontLarge.classList.remove("closed");
        vinylLarge.classList.remove("closed");
    }, 2000);
}

function enable3D() {
    let checkbox = document.getElementById("three-checkbox")

    if (checkbox.checked == true) {
        threeRecord.style.display = "block"
        dummyContainer.style.display = "none"
        rotateIcon.style.display = "none"
    }
    else {
        threeRecord.style.display = "none"
        dummyContainer.style.display = "block"
        rotateIcon.style.display = "block"
    }
}  