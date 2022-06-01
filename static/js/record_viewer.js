// Collection of reused variable names
var sleeve_box = document.getElementById("sleeve_box");
var record_container = document.getElementById("record_container");
var rotate_icon = document.getElementById("rotate_icon");
var vinyl_front = document.getElementById("vinyl_front");
var jacket_thickness = document.getElementById("jacket_thickness");
var jacket_front = document.getElementById("jacket_front");
var jacket_back = document.getElementById("jacket_back");
var dummy_container = document.getElementById("dummy_container");
var  jacket_back_slider = document.getElementById("jacket_back_slider");
var vinyl_back_slider = document.getElementById("vinyl_back_slider")
const sleevetext = Array.from(document.getElementsByClassName("sleevetext"));
var singlelyrics_text = document.getElementById("singlelyrics_text");
var goback_arrow = document.getElementById("goback_arrow");
var bandcamp_player = document.getElementById("bandcamp_player");

// Function for moving from outer album view to liner notes view
function tolinernotes() {
    dummy_container.classList.add("fadeout");
    rotate_icon.classList.add("fadeout");
    sleeve_box.classList.remove("fadeout");
    vinyl_front.style.transform = "translateX(100vw)";
    jacket_front.style.transform = "translateX(-100vw)";
    jacket_thickness.style.transform = "translateX(-100vw)";
    jacket_back_slider.style.transform = "translateX(100vw)";
    vinyl_back_slider.style.transform = "translateX(-100vw)";
    setTimeout(function() { dummy_container.style.display = "none"; rotate_icon.style.display = "none"; sleeve_box.style.display = "flex"; sleeve_box.classList.add("fadein"); }, 1000);
    setTimeout(function() { dummy_container.classList.remove("fadeout"); rotate_icon.classList.remove("fadeout"); sleeve_box.classList.remove("fadein"); }, 2000);
}

// Hide vinyl on rotate icon hover
function retractvinyl() {
    vinyl_front.classList.add("translatevinyl");
    jacket_front.classList.add("translatejacket");
    jacket_back_slider.classList.add("translatejacket");
    vinyl_back_slider.classList.add("translatevinyl_reverse");
}

// Show vinyl again
function expandvinyl() {
    vinyl_front.classList.remove("translatevinyl");
    jacket_front.classList.remove("translatejacket");
    jacket_back_slider.classList.remove("translatejacket");
    vinyl_back_slider.classList.remove("translatevinyl_reverse");
}

// Rotate record jacket to see back/front
function rotaterecord() {
    if (record_container.classList.contains("isrotated")) {
        record_container.style.transform = "rotateY(0deg)";
        record_container.classList.remove("isrotated");
        
    }
    else {
        record_container.style.transform = "rotateY(180deg)";
        record_container.classList.add("isrotated");
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
    sleeve_box.classList.add("fadeout");
    vinyl_front.style.transform = "";
    jacket_front.style.transform = "";
    jacket_thickness.style.transform = "";
    jacket_back_slider.style.transform = "";
    vinyl_back_slider.style.transform = "";
    setTimeout(function() { sleeve_box.style.display = "none"; dummy_container.style.display = "grid"; dummy_container.classList.add("fadein"); rotate_icon.style.display = "block"; rotate_icon.classList.add("fadein"); }, 1000);
    setTimeout(function() { dummy_container.classList.remove("fadein"); rotate_icon.classList.remove("fadein"); }, 2000);
}

// Go back to full lyrics view 
function goback() {
    singlelyrics_text.classList.add("fadeout");
    goback_arrow.classList.add("fadeout");
    bandcamp_player.classList.add("fadeout");
    setTimeout(function() { singlelyrics_text.style.display = "none"; singlelyrics_text.classList.remove("fadeout"); goback_arrow.style.display = "none"; goback_arrow.classList.remove("fadeout"); bandcamp_player.classList.remove("fadeout"); bandcamp_player.style.display = "none"; }, 1000);
    sleevetext.forEach(text => {
        setTimeout(function() { text.style.display = "block"; text.classList.add("fadein"); }, 1000);
        setTimeout(function() { text.classList.remove("fadein"); }, 2000);
    })
};

// Select single set of lyrics and show bandcamp player
function singlelyrics(obj) {
    sleevetext.forEach(text => {
        text.classList.remove("notselected")
        text.classList.add("fadeout");
        setTimeout(function() { text.style.display = "none"; text.classList.remove("fadeout")}, 1000);
    })
    divid = obj.id;
    if (obj.id == "text1") {
        singlelyrics_text.innerHTML = `<span><h3>Intro</h3><p style="font-size:min(1vh, 1vw)">
                                                                    [Instrumental]
                                                                    </p></span>`;
        bandcamp_player.src = "https://bandcamp.com/EmbeddedPlayer/album=390734231/size=small/bgcol=f7f6f2/linkcol=0687f5/artwork=none/track=1716247834/transparent=true/"
    }

    else if (obj.id == "text2") {
        singlelyrics_text.innerHTML = `<span><h3>Two Weeks</h3><p style="font-size:min(1vh, 1vw)">
                                                                    <br>
                                                                    When I go<br>
                                                                    They\’ll take me home<br>
                                                                    To say my last “I\’m sorry”<br>
                                                                    And pick at my bones<br>
                                                                    <br>
                                                                    Make peace and then<br>
                                                                    Just throw me back again<br>
                                                                    Mmhmm<br>
                                                                    Skip all the theatrics<br>
                                                                    When the curtains have closed<br>
                                                                    <br>
                                                                    When I dig down deep<br>
                                                                    I find, inside of me,<br>
                                                                    Not much<br>
                                                                    <br>
                                                                    Just what I owe<br>
                                                                    All that will go slowly<br>
                                                                    Back into what I love<br>
                                                                    <br>
                                                                    When I can learn to count from ten;<br>
                                                                    Let it decompose<br>
                                                                    <br>
                                                                    And we may step into the sea before then<br>
                                                                    Singing “God help us all”<br>
                                                                    But maybe it\’s best that it all starts again<br>
                                                                    I hope I\’ll have loved you as best as I could by then<br>
                                                                    <br>
                                                                    (And we may step into the sea before then<br>
                                                                    Screaming “God help us all”<br>
                                                                    But maybe it\’s best that it all starts again<br>
                                                                    I hope I\’ll have loved you<br>
                                                                    I hope I\’ll have loved you by)<br>
                                                                    <br>
                                                                    When I go<br>
                                                                    They\’ll take me home<br>
                                                                    To say my last “I\’m sorry”<br>
                                                                    <br>
                                                                    I hope I can still sing by then<br>
                                                                    </p></span>`;
        bandcamp_player.src = "https://bandcamp.com/EmbeddedPlayer/album=390734231/size=small/bgcol=f7f6f2/linkcol=0687f5/artwork=none/track=2654642781/transparent=true/"
    }
    
    else if (obj.id == "text3") {
        singlelyrics_text.innerHTML = `<span><h3>Silver Arrow, Golden Bird</h3><p style="font-size:min(1vh, 1vw)">
                                                                    <br>
                                                                    State-owned coal mine<br>
                                                                    Glean from the land what\’s left behind<br>
                                                                    Closed doors, cold eyes<br>
                                                                    Making believe we\’re stuck inside<br>
                                                                    <br>
                                                                    “I\’m yours, hold tight”<br>
                                                                    Feathered and glowing half as bright<br>
                                                                    Gold bird, white lie<br>
                                                                    Love is a thing to keep alive<br>
                                                                    </p></span>`;
        bandcamp_player.src = "https://bandcamp.com/EmbeddedPlayer/album=390734231/size=small/bgcol=f7f6f2/linkcol=0687f5/artwork=none/track=1716247834/transparent=true/"
    }

    else if (obj.id == "text4") {
        singlelyrics_text.innerHTML = `<span><h3>Marimba</h3><p style="font-size:min(1vh, 1vw)">
                                                                    <br>
                                                                    There is a bug that lives inside my room<br>
                                                                    Though pretty often mostly out of view<br>
                                                                    Oh little one, I\’d like to be beneath the dirt with you<br>
                                                                    <br>
                                                                    You cut my hair beneath a yellow porchlight<br>
                                                                    A light turned on an hour past my bedtime<br>
                                                                    A thousand threads of me will fall<br>
                                                                    Beneath these yellow moons<br>
                                                                    <br>
                                                                    And I think I could tell you everything<br>
                                                                    Oh, if I could tell you anything<br>
                                                                    At all<br>
                                                                    <br>
                                                                    I feel pathetic now that I\’m not grade-bound<br>
                                                                    A caught a cold the day I let my guard down<br>
                                                                    How could it be more comfortable to lie beneath a boot<br>
                                                                    <br>
                                                                    Oh, and I think I could tell you everything<br>
                                                                    Oh, if I could tell you anything<br>
                                                                    Oh, I want to tell you everything<br>
                                                                    Anything<br>
                                                                    </p></span>`;
    bandcamp_player.src = "https://bandcamp.com/EmbeddedPlayer/album=390734231/size=small/bgcol=f7f6f2/linkcol=0687f5/artwork=none/track=1716247834/transparent=true/"
    }
    else if (obj.id == "text5") {
        singlelyrics_text.innerHTML = `<span><h3>Outro, Above</h3><p style="font-size:min(1vh, 1vw)">
                                                                    [Instrumental]
                                                                    </p></span>`;
    bandcamp_player.src = "https://bandcamp.com/EmbeddedPlayer/album=390734231/size=small/bgcol=f7f6f2/linkcol=0687f5/artwork=none/track=1716247834/transparent=true/"
    }
    else if (obj.id == "text6") {
        singlelyrics_text.innerHTML = `<span><h3>Two Steps Outside</h3><p style="font-size:min(1vh, 1vw)">
                                                                    <br>
                                                                    I\’ve got a hand to hold<br>
                                                                    Come, I\’ll let you hold it<br>
                                                                    <br>
                                                                    I\’ve got a hand to hold<br>
                                                                    Come, I\’ll let you have it<br>
                                                                    <br>
                                                                    All you have is mine (mine)<br>
                                                                    <br>
                                                                    Oh, little heart of gold<br>
                                                                    Could you let us see you<br>
                                                                    <br>
                                                                    Come see where I made it<br>
                                                                    It started here for you<br>
                                                                    <br>
                                                                    Keep coming back here<br>
                                                                    I feel it too<br>
                                                                    <br>
                                                                    Oh, little heart of gold<br>
                                                                    Come and stay here soon<br>
                                                                    <br>
                                                                    All you are is mine (mine)<br>
                                                                    All that you can find:<br>
                                                                    Mine<br>
                                                                    <br>
                                                                    (Instrumental)<br>
                                                                    <br>
                                                                    I\’ve got a hand to hold<br>
                                                                    Come and let me hold you<br>
                                                                    <br>
                                                                    Sleep, little heart of gold<br>
                                                                    I know what you\’ve been through<br>
                                                                    <br>
                                                                    All you are is mine<br>
                                                                    And I love you<br>
                                                                    I cannot change what you\’ve been through<br>
                                                                    But I\’ll change you<br>
                                                                    </p></span>`
    bandcamp_player.src = "https://bandcamp.com/EmbeddedPlayer/album=390734231/size=small/bgcol=f7f6f2/linkcol=0687f5/artwork=none/track=1716247834/transparent=true/"
    }
    else if (obj.id == "text7") {
        singlelyrics_text.innerHTML = `<span><h3>Outro, Lullaby</h3><p style="font-size:min(1vh, 1vw)">
                                                                    [Guitar, Thunder]
                                                                    </p></span>`;
    bandcamp_player.src = "https://bandcamp.com/EmbeddedPlayer/album=390734231/size=small/bgcol=f7f6f2/linkcol=0687f5/artwork=none/track=1716247834/transparent=true/"
    }
    setTimeout(function() { singlelyrics_text.style.display = "grid"; singlelyrics_text.classList.add("fadein"); goback_arrow.style.display = "block"; goback_arrow.classList.add("fadein"); bandcamp_player.style.display = "block"; bandcamp_player.classList.add("fadein"); }, 1000);
    setTimeout(function() { goback_arrow.style.display = "default"; singlelyrics_text.classList.remove("fadein"); goback_arrow.classList.remove("fadein"); bandcamp_player.classList.remove("fadein"); }, 2000);
}

