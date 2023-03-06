//создание списка песен
var playListContainer = document.querySelector('.play-list');
for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = playList[i].title;
  playListContainer.append(li);
};

//Аудиоплеер
import playList from './playList.js';
const playBtn = document.querySelector('.play');
const audio = new Audio();
var playNum = 0;
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playItem = document.querySelectorAll('.play-item');
const playSongName = document.querySelector('.song-name');
audio.src = playList[playNum].src;

function playAudio() {
  playItem[playNum].classList.add('item-active');
  if(audio.paused) {
    audio.play();
    playBtn.classList.add("pause");
    return;
  };
  audio.pause();
  playBtn.classList.remove("pause");
};
playBtn.addEventListener('click', playAudio);

//предыдущая мелодия
function playPrev() {
  playItem[playNum].classList.remove('item-active');
  if (playNum == 0) {
    playNum = playList.length-1
  } else {playNum -= 1};
  audio.src = playList[playNum].src;
  playSongName.textContent = playList[playNum].title;
  playAudio();
};
playPrevBtn.addEventListener('click', playPrev);

//следующая мелодия
function playNext() {
  playItem[playNum].classList.remove('item-active');
  if (playNum == playList.length-1) {
    playNum = 0
  } else {playNum += 1};
  audio.src = playList[playNum].src;
  playSongName.textContent = playList[playNum].title;
  playAudio();
};
playNextBtn.addEventListener('click', playNext);

const audioPlayer = document.querySelector(".player");
audioPlayer.querySelector(".song-time .length").textContent = "0:39";
audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".song-time .length").textContent = getTimeCodeFromNum(
      audio.duration
      );
      audio.volume = volumeSlider.value  / 100;
    },
    false
);

//check audio percentage and update time accordingly
setInterval(() => {
  if (audio.currentTime == audio.duration) {
    playNext();
  }
}, 100);

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;
  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
  seconds % 60
  ).padStart(2, 0)}`;
};

//Volume
const volumeSlider = document.getElementById('volume-slider');
const outputContainer = document.getElementById('volume-output');

volumeSlider.addEventListener('input', (e) => {
  const value = e.target.value;
  outputContainer.textContent = value;
  audio.volume = value / 100;
});

//muting volume
const muteIconContainer = document.getElementById('mute-icon');

muteIconContainer.addEventListener('click', () => {
  if(!audio.muted) {
    audio.muted = true;
    muteIconContainer.classList.remove("icono-volumeMedium");
    muteIconContainer.classList.add("icono-volumeMute");
  } else {
    audio.muted = false;
    muteIconContainer.classList.add("icono-volumeMedium");
    muteIconContainer.classList.remove("icono-volumeMute");
  }
});
//volume

//Progress-bar
const seekSlider = document.getElementById('seek-slider');
const currentTime = document.getElementById('current-time');
// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
  seekSlider.max = audio.duration;
  seekSlider.value = audio.currentTime;
  currentTime.innerText = getTimeCodeFromNum(audio.currentTime);
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

seekSlider.addEventListener('change', changeProgressBar);
// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
  audio.currentTime = seekSlider.value;
};