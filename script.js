// get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build functions

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }
// Since there are multiple ways to stop and start the video, the eventListener to update the button should be looking for the video starting and stopping, not a click or otherwise.

// This updates the icon of the play/pause button. Be mindful of naming conventions. 
function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    console.log(icon);
    toggle.textContent = icon;
  }

 function skip() {
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip);
  }
    // parses a string argument and returns a floating point number.

function handleRangeUpdate() {
    video[this.name] = this.value;
 }

//  Using flex basis value
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// Drag cursor to point in video
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;   //offsetWidth gives length of bar
    video.currentTime = scrubTime;
    console.log(e);
}


// hook up eventlisteners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress); //progress is another option
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

// Similar to Canvas app, creating mouse events based on true or false.
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);