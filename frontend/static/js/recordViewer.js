// Collection of reused variable names
const openRecordWrapper = document.getElementById("open-record-wrapper");
const recordContainer = document.getElementById("record-container");
const rotateIcon = document.getElementById("rotate-icon");
const vinylFront = document.getElementById("vinyl-front");
const jacketThickness = document.getElementById("jacket-thickness");
const jacketFront = document.getElementById("jacket-front");
const jacketBack = document.getElementById("jacket-back");
const jacketFrontLarge = document.getElementById("jacket-front-large");
const jacketBackLarge = document.getElementById("jacket-back-large");
const dummyContainer = document.getElementById("dummy-container");
const jacketBackSlider = document.getElementById("jacket-back-slider");
const vinylBackSlider = document.getElementById("vinyl-back-slider")
const sleevetext = Array.from(document.getElementsByClassName("sleevetext"));
const singleLyricsText = document.getElementById("singlelyrics-text");
const goBackArrow = document.getElementById("goback-arrow");
const bandcampPlayer = document.getElementById("bandcamp-player");
const vinylArrowReverse = document.getElementById("vinyl-arrow-reverse");

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
    rotateIcon.classList.add("fadeout");
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
        rotateIcon.style.display = "none"; 
        openRecordWrapper.style.display = "block"; 
        openRecordWrapper.classList.add("fadein");
    }, 1000);
    setTimeout(function() { 
        dummyContainer.classList.remove("fadeout"); 
        rotateIcon.classList.remove("fadeout"); 
        openRecordWrapper.classList.remove("fadein"); 
    }, 2000);
}

// Hide vinyl on rotate icon hover
function retractvinyl() {
    vinylFront.classList.add("translatevinyl");
    jacketFront.classList.add("translatejacket");
    jacketBackSlider.classList.add("translatejacket");
    vinylBackSlider.classList.add("translatevinyl-reverse");
}

// Show vinyl again
function expandvinyl() {
    vinylFront.classList.remove("translatevinyl");
    jacketFront.classList.remove("translatejacket");
    jacketBackSlider.classList.remove("translatejacket");
    vinylBackSlider.classList.remove("translatevinyl-reverse");
}

// Close vinyl on back arrow hover
function closeJacket() {
    jacketFrontLarge.classList.add("closed");
    jacketBackLarge.classList.add("closed");
}

// Open vinyl after back arrow hover
function openJacket() {
    jacketFrontLarge.classList.remove("closed");
    jacketBackLarge.classList.remove("closed");
}

// Rotate record jacket to see back/front
function rotaterecord() {
    if (recordContainer.classList.contains("isrotated")) {
        recordContainer.style.transform = "rotateY(0deg)";
        recordContainer.classList.remove("isrotated");
        
    }
    else {
        recordContainer.style.transform = "rotateY(180deg)";
        recordContainer.classList.add("isrotated");
    }
}

// Highlight hovered lyrics
function boldlyrics(obj) {
    sleevetext.forEach(text => {
        if (obj.id == text.id) {
            return;
        }
        else {
            text.classList.add("notselected");
        }
    })
}

// Return lyrics to original state
function resetlyrics(obj) {
    sleevetext.forEach(text => {
        if (obj.id == text.id) {
            return;
        }
        else {
            text.classList.remove("notselected")
        }
    })
}

// Return to album jacket view
function returntoalbumview() {
    jacketFrontLarge.classList.add("closed");
    jacketBackLarge.classList.add("closed");
    openRecordWrapper.classList.add("fadeout");
    vinylFront.style.transform = "";
    jacketFront.style.transform = "";
    jacketThickness.style.transform = "";
    jacketBackSlider.style.transform = "";
    vinylBackSlider.style.transform = "";
    // let threeButton = document.querySelector("#three-button");
    // threeButton.style.display = 'block';
    setTimeout(function() { 
        openRecordWrapper.style.display = "none"; 
        dummyContainer.style.display = "flex"; 
        dummyContainer.classList.add("fadein"); 
        rotateIcon.style.display = "block"; 
        rotateIcon.classList.add("fadein"); 
    }, 1000);
    setTimeout(function() { 
        dummyContainer.classList.remove("fadein"); 
        rotateIcon.classList.remove("fadein"); 
        jacketFrontLarge.classList.remove("closed");
        jacketBackLarge.classList.remove("closed");

    }, 2000);
}

// Go back to full lyrics view 
function goback() {
    singleLyricsText.classList.add("fadeout");
    goBackArrow.classList.add("fadeout");
    bandcampPlayer.classList.add("fadeout");
    setTimeout(function() { 
        singleLyricsText.style.display = "none"; 
        singleLyricsText.classList.remove("fadeout"); 
        goBackArrow.style.display = "none"; 
        goBackArrow.classList.remove("fadeout"); 
        bandcampPlayer.classList.remove("fadeout"); 
        bandcampPlayer.style.display = "none"; 
    }, 1000);
    sleevetext.forEach(text => {
        setTimeout(function() { 
            text.style.display = "block"; 
            text.classList.add("fadein"); 
        }, 1000);
        setTimeout(function() { 
            text.classList.remove("fadein"); 
        }, 2000);
    })
};

// Select single set of lyrics and show bandcamp player
function singlelyrics(obj) {
    sleevetext.forEach(text => {
        text.classList.remove("notselected")
        text.classList.add("fadeout");
        setTimeout(function() { 
            text.style.display = "none"; 
            text.classList.remove("fadeout")
        }, 1000);
    })
    divid = obj.id;
    if (obj.id == "text1") {
        singleLyricsText.innerHTML = 
            `
                <h3>Sophie (Intro)</h3>
                <div id='lyrics-wrapper'>
                    [Instrumental]
                </div>
            `;
    }

    else if (obj.id == "text2") {
        singleLyricsText.innerHTML = 
            `
                <h3>Heirloom</h3>
                <div id='lyrics-wrapper'>
                    <p>
                        When I go <br>
                        They'll take me home <br>
                        To say my last "I'm sorry" <br>
                        And pick at my bones
                    </p>
                    <p>
                        Make peace and then <br>
                        Just throw me back again <br>
                        Mmhmm <br>
                        Skip all the theatrics <br>
                        When the curtains have closed
                    </p>
                    <p>
                        When I dig down deep <br>
                        I find, inside of me, <br>
                        Not much
                    </p>
                    <p>
                        Just what I owe <br>
                        All that turning slowly back into what I love <br>
                        (What I love) <br>
                        When I can learn to count from ten; <br>
                        Let it decompose
                    </p>
                    <p>
                        And we may step into the sea before then <br>
                        Singing "God help us all" <br>
                        But maybe it's best that it all starts again <br>
                        I hope I'll have loved you as best as I could by then
                    </p>
                    <p>
                        (And we may step into the sea before then <br>
                        Screaming "God help us all" <br>
                        But maybe it's best that it all starts again <br>
                        I hope I'll have loved you <br>
                        I hope I'll have loved you by)
                    </p>
                    <p>
                        When I go <br>
                        They'll take me home <br>
                        To say my last "I'm sorry"
                    </p>
                    <p>
                        I hope I can still sing by then
                    </p>
                </div>
            `;
    }
    
    else if (obj.id == "text3") {
        singleLyricsText.innerHTML = 
            `
                <h3>Silver Arrow, Golden Bird</h3>
                <div id='lyrics-wrapper'>
                    <p>
                        State-owned coal mine <br>
                        Glean from the land what's left behind <br>
                        Closed doors, cold eyes <br>
                        Making believe we're stuck inside
                    </p>
                    <p>
                        "I'm yours, hold tight" <br>
                        Feathered and glowing half as bright <br>
                        Gold bird, white lie: <br>
                        Love is a thing to keep alive
                    </p>
                </div>
            `;
    }

    else if (obj.id == "text4") {
        singleLyricsText.innerHTML = 
            `
                <h3>Marimba</h3>
                <div id='lyrics-wrapper'>
                    <p>
                        There is a bug that lives inside my room <br>
                        Though pretty often mostly out of view <br>
                        Oh, little one, I'd like to be beneath the dirt with you
                    </p>
                    <p>
                        You cut my hair beneath a yellow porch-light <br>
                        A light turned on an hour past my bedtime <br>
                        A thousand threads of me will fall <br>
                        Beneath these yellow moons
                    </p>
                    <p>
                        Oh, and I think I could tell you everything <br>
                        If only I could tell you anything <br>
                        At all
                    <p>
                    </p>
                        I feel pathetic now that I'm not grade-bound <br>
                        A caught a cold the day I let my guard down <br>
                        How could it be more comfortable to lie beneath a boot
                    </p>
                    <p>
                        Oh, and I think I could tell you everything <br>
                        If only I could tell you anything <br>
                        I want to tell you everything <br>
                        Anything
                    </p>
                </div>
            `;
    }
    else if (obj.id == "text5") {
        singleLyricsText.innerHTML = 
            `
                <h3>𝄐</h3>
                <div id='lyrics-wrapper'>
                    [Instrumental]
                </div>
            `;
    }
    else if (obj.id == "text6") {
        singleLyricsText.innerHTML = 
            `
                <h3>Two Steps Outside</h3>
                <div id='lyrics-wrapper'>
                    <p>
                        I've got a hand to hold <br>
                        Gonna let you hold it <br>
                        I've got a hand to hold <br>
                        Gonna I'll let you have it
                    </p>
                    <p>
                        All you have is mine (mine)
                    </p>
                    <p>
                        Oh, little heart of gold <br>
                        Would you let us see you <br>
                        Here, in a thicket, <br>
                        where sage and laurel bloom <br>
                        Leaves, in a whisper <br>
                        I hear it too <br>
                        Oh, little heart of gold <br>
                        Come and stay here soon
                    </p>
                    <p>
                        All you have is mine (mine) <br>
                        All that you will find: <br>
                        Mine
                    </p>
                    <p>
                        I've got a hand to hold <br>
                        Come and let me hold you <br>
                        Sleep, little heart of gold <br>
                        I know what you've been through
                    </p>
                    <p>
                        All you are is mine <br>
                        And I love you <br>
                        I cannot change what you've been through <br>
                        But I'll change you
                    </p>
                </div>
            `
    }
    else if (obj.id == "text7") {
        singleLyricsText.innerHTML = 
            `
                <h3>The Same Things (Outro)</h3>
                <div id='lyrics-wrapper'>
                    [Guitar, Thunder]
                </p>
            `;
    }
    setTimeout(function() { 
        singleLyricsText.style.display = "grid"; 
        singleLyricsText.classList.add("fadein"); 
        goBackArrow.style.display = "block"; 
        goBackArrow.classList.add("fadein"); 
        bandcampPlayer.style.display = "block"; 
        bandcampPlayer.classList.add("fadein"); 
    }, 1000);
    setTimeout(function() { 
        goBackArrow.style.display = "default"; 
        singleLyricsText.classList.remove("fadein"); 
        goBackArrow.classList.remove("fadein"); 
        bandcampPlayer.classList.remove("fadein"); 
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