/** Scripts for Cognitive Processes Study */

const delayBeforeFirstWord = 1500;
const timePerWord = 3000; // three seconds
const retrievalTime = 120*1000; // two minutes
const numberOfTrials = 6;
var words = [];
var participantNumber = -1;
var trialNumber = 0;

function playMusic() {
    participantCategory = participantNumber % 6;
    trialCategory = trialNumber % 3;
    audio = null;
    if ((participantCategory == 0 && trialCategory == 1) || (participantCategory == 1 && trialCategory == 2)
        || (participantCategory == 2 && trialCategory == 0) || (participantCategory == 3 && trialCategory == 0)
        || (participantCategory == 4 && trialCategory == 1) || (participantCategory == 5 && trialCategory == 2)) {
        // low arousal music
        if (trialNumber < 3) {
            audio = document.getElementById("lowAudio1");
        } else {
            audio = document.getElementById("lowAudio2");
        }
    } else if ((participantCategory == 0 && trialCategory == 2) || (participantCategory == 1 && trialCategory == 1)
        || (participantCategory == 2 && trialCategory == 2) || (participantCategory == 3 && trialCategory == 1)
        || (participantCategory == 4 && trialCategory == 0) || (participantCategory == 5 && trialCategory == 0)) {
        // high arousal music
        if (trialNumber < 3) {
            audio = document.getElementById("highAudio1");
        } else {
            audio = document.getElementById("highAudio2");
        }
    } else {
        // no music
        return;
    }
    audio.currentTime = 0;
    audio.play();
}

function setWords() {
    if (trialNumber == 0) {
        words = ["language", "police", "safety", "tradition", "cousin", "girl", "heart", "editor", "topic", "dinner", "society", "town", "charity", "politics", "menu", "queen", "story", "youth", "climate", "lake"];
    } else if (trialNumber == 1) {
        words = ["camera", "candidate", "song", "success", "president", "audience", "science", "tension", "tennis", "failure", "opinion", "dirt", "basket", "tongue", "meat", "homework", "intention", "event", "accident", "idea"];
    } else if (trialNumber == 2) {
        words = ["love", "union", "phone", "guest", "apartment", "property", "piano", "user", "patience", "chapter", "engine", "employee", "attitude", "skill", "problem", "speaker", "beer", "power", "bath", "computer"];
    } else if (trialNumber == 3) {
        words = ["theory", "cheek", "concept", "honey", "city", "library", "fortune", "classroom", "quality", "mall", "professor", "salad", "signature", "nation", "studio", "situation", "bread", "income", "activity", "stranger"];
    } else if (trialNumber == 4) {
        words = ["desk", "gate", "student", "coffee", "sample", "reality", "news", "health", "location", "math", "volume", "paper", "throat", "attention", "chest", "steak", "outcome", "entry", "truth", "security"];
    } else if (trialNumber == 5) {
        words = ["mood", "chocolate", "courage", "disease", "bedroom", "area", "direction", "departure", "airport", "solution", "surgery", "freedom", "army", "insect", "football", "poetry", "quantity", "member", "actor", "length"];
    } else {
        words = ["BOOOOOOO too many trials."];
    }
    if (words.length != 20) {
        words = ["BOOOOOOO length of words is not 20."];
    }
}

function soundTest() {
    soundTestAudio = document.getElementById("soundTestAudio");
    soundTestAudio.currentTime = 0;
    soundTestAudio.play();
}

/** Begins a trial (at the encoding stage).
    Increments counter for trialNumbers, and sets music accordingly. */
function startTrial() {
    //get participant number
    if (participantNumber == -1) {
        inputNumber = parseInt(document.getElementById("participantInput").value);
        if (inputNumber) {
            participantNumber = inputNumber;    
        } else {
            document.getElementById("participantNumber").style.color = "red";
            return;
        }
    }
    
    // hide other elements
    document.getElementById("initialInstructionText").style.display = "none";
    document.getElementById("startTrialButton").style.display = "none";
    document.getElementById("participantNumber").style.display = "none";
    document.getElementById("soundTestButton").style.display = "none";
    
    setWords();
    //display word element
    let wordText = document.getElementById("wordText");
    wordText.innerHTML = "";
    wordText.style.display = "block";
    totalWordCount = words.length;
    for (var i = 0; i < totalWordCount; i++) { 
        setTimeout(updateWord, delayBeforeFirstWord + timePerWord*i);
    }
    setTimeout(retrievalStage, delayBeforeFirstWord + timePerWord*totalWordCount);
    
    playMusic();
}

/** Updates the word displayed on the screen; called during encoding stage */
function updateWord() {
    let randomIndex = Math.floor(Math.random()*words.length);
    document.getElementById("wordText").innerHTML = words[randomIndex];
    words.splice(randomIndex, 1);
}

/** Display screen for the retrieval stage */
function retrievalStage() {
    document.getElementById("wordText").style.display = "none";
    document.getElementById("finishButton").style.display = "inline-block";
    document.getElementById("retrievalInstructionText").style.display = "block";
}

/** Display screen to begin next trial */
function awaitNextTrial() {
    //pause all audio elements
    audioElements = document.getElementsByTagName("audio");
    for (i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
    }
    document.getElementById("retrievalInstructionText").style.display = "none";
    document.getElementById("finishButton").style.display = "none";
    
    trialNumber = trialNumber + 1;
    if (trialNumber >= numberOfTrials) {
        displayThankYou();
        return;
    }
    document.getElementById("trialNumber").innerHTML = trialNumber + 1;
    document.getElementById("initialInstructionText").style.display = "block";
    document.getElementById("startTrialButton").style.display = "inline-block";
    document.getElementById("soundTestButton").style.display = "inline-block";
}

function displayThankYou() {
    document.getElementById("thankYouText").style.display = "block";
}