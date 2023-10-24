//contexto  -----GLOBAL: NOTA
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//variable para 
// rastrear el oscilador ----GLOBAL: NOTA
let currentOscillator = null;

//funcion para reproducir una nota
function playNote(freq) {
  if (currentOscillator) {
    currentOscillator.stop();
  };
  
  let oscillator = audioContext.createOscillator();
  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
  //aasigno el oscilador al currentOscillator
  currentOscillator = oscillator;
  
}
function stopMusic() {
  if (currentOscillator) {
    currentOscillator.stop();
  }
}

// ----------VAR KEYS
const idKeys = [
    "c-key","c#-key","d-key","d#-key","e-key",
    "f-key","f#-key","g-key","g#-key","a-key",
    "a#-key","b-key","c2-key"
];
const nodeKeys =[];
idKeys.forEach(key =>{
    nodeKeys.push(document.getElementById(key));
});

// ---------FUNCTION PLAY PIANO
function keyPlay(event){
    event.target.style.boxShadow = "0 0";
    event.target.style.backgroundColor = "#8a878dfe";

    switch (event.target.innerText) {
        case "C":
          playNote(261.63);
          break;
        case "C#":
          playNote(277.18);
          break;
    
        case "D":
          playNote(293.66);
          break;
        case "D#":
          playNote(311.13);
          break;
        case "E":
          playNote(329.63);
          break;
        case "F":
          playNote(349.23);
          break;
        case "F#":
          playNote(369.99);
          break;
        case "G":
          playNote(392.00);
          break;
        case "G#":
          playNote(415.30);
          break;
        case "A":
          playNote(440.00);
          break;
        case "A#":
          playNote(466.16);
          break;
        case "B":
          playNote(493.88);
          break;
        case "C^":
          playNote(523.25);
          break;
    
        default:
          false
          break;
      }
};
function keyReturn(event) {
    event.target.style.backgroundColor = "";
    event.target.style.boxShadow = "";
  
    switch (event.target.innerText) {
      case "C":
        stopMusic();
        break;
      case "C#":
        stopMusic();
        break;
  
      case "D":
        stopMusic();
        break;
      case "D#":
        stopMusic();
        break;
      case "E":
        stopMusic();
        break;
      case "F":
        stopMusic();
        break;
      case "F#":
        stopMusic();
        break;
      case "G":
        stopMusic();
        break;
      case "G#":
        stopMusic();
        break;
      case "A":
        stopMusic();
        break;
      case "A#":
        stopMusic();
        break;
      case "B":
        stopMusic();
        break;
      case "C^":
        stopMusic();
        break;
      default:
        break;
    }
};
function keyEvent(note){
    note.ontouchstart = keyPlay;
    note.ontouchend = keyReturn;
    
    note.onmousedown = keyPlay;
    note.onmouseup = keyReturn;
};
nodeKeys.forEach(keyEvent);

// ---------CHANGE LYRICS
const btnOne = document.querySelector("#nextOne");
const btnTwo = document.querySelector("#nextTwo");
const btnThree = document.querySelector("#nextThree");
const btnReset = document.querySelector("#nextFour");

btnTwo.hidden = true;
btnThree.hidden = true;
btnReset.hidden = true;

const lyOne = document.querySelector("#lyricOne");
const ntOne = document.querySelector("#noteOne");

const lyTwo = document.querySelector("#lyricTwo");
const ntTwo = document.querySelector("#noteTwo");

const lyThree = document.querySelector("#lyricThree");
const ntThree = document.querySelector("#noteThree");

const lyFour = document.querySelector("#lyricFour");
const ntFour = document.querySelector("#noteFour");

const lyFive = document.querySelector("#lyricFive");
const ntFive = document.querySelector("#noteFive");

const lySix = document.querySelector("#lyricSix");
const ntSix = document.querySelector("#noteSix");

const lyExtra = document.querySelector("#lyricExtra");
const ntExtra = document.querySelector("#noteExtra");
const colExtra = document.querySelector(".colExtra");
// colExtra.style.display = "none";
colExtra.hidden=true;

// EVENTS CHANGE LYRICS----
btnOne.onclick = ()=>{
    btnOne.hidden = true;
    btnTwo.hidden = false;

    ntFive.innerHTML = "G";
    ntSix.innerHTML = "F";    
};
btnTwo.onclick = ()=>{
    btnTwo.hidden = true;
    btnThree.hidden = false;

    lyFive.innerHTML = "DEAR";
    lySix.innerHTML = "FRY-";
    colExtra.hidden = false;

    ntThree.innerHTML = "C^";
    ntFour.innerHTML = "A";
    ntFive.innerHTML = "F";
    ntSix.innerHTML = "E";
};
btnThree.onclick = ()=>{
    btnThree.hidden = true;
    btnReset.hidden = false;

    lyOne.innerHTML = "HAP-";
    lyTwo.innerHTML = "PY";
    lyThree.innerHTML = "BIRTH-";
    lyFour.innerHTML = "DAY";
    lyFive.innerHTML = "TO";
    lySix.innerHTML = "YOU!"

    colExtra.hidden = true;

    ntOne.innerHTML = "A#";
    ntTwo.innerHTML = "A#";
    ntThree.innerHTML = "A";
    ntFour.innerHTML = "F";
    ntFive.innerHTML = "G";
    ntSix.innerHTML = "F";
};
btnReset.onclick = ()=>{
    btnReset.hidden = true;
    btnOne.hidden = false;

    lyOne.innerHTML = "HAP-";
    lyTwo.innerHTML = "PY";
    lyThree.innerHTML = "BIRTH-";
    lyFour.innerHTML = "DAY";
    lyFive.innerHTML = "TO";
    lySix.innerHTML = "YOU";

    ntOne.innerHTML = "C";
    ntTwo.innerHTML = "C";
    ntThree.innerHTML = "D";
    ntFour.innerHTML = "C";
    ntFive.innerHTML = "F";
    ntSix.innerHTML = "E";
};