// player
var music = document.querySelector('.music-element')
var playBtn = document.querySelector('.play')
var seekbar = document.querySelector('.seekbar')
var currentTime = document.querySelector('.current-time')
var duration = document.querySelector('.duration')
var audio = document.querySelector('audio');


  
  
if (audio) {
  window.addEventListener('keypress', function (event) {
    var key = event.which || event.keyCode;
    if (key === 32) { // spacebar
      event.preventDefault();
      handlePlay();
    }
  });
}


music.onloadeddata = function () {
    seekbar.max = music.duration
    var ds = parseInt(music.duration % 60)
    var dm = parseInt((music.duration / 60) % 60)
    duration.innerHTML = dm + ':' + ds
}

music.onloadeddata();

function handlePlay() {
    if (music.paused) {
        music.play();
        playBtn.className = 'pause'
        playBtn.innerHTML = '<i class="material-icons">pause</i>'
    } else {
        music.pause();
        playBtn.className = 'play'
        playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
    }
    music.addEventListener('ended', function () {
        playBtn.className = 'play'
        playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
        music.currentTime = 0
    });
}

music.ontimeupdate = function () { seekbar.value = music.currentTime }
handleSeekBar = function () { music.currentTime = seekbar.value }
music.addEventListener('timeupdate', function () {
    var cs = parseInt(music.currentTime % 60)
    var cm = parseInt((music.currentTime / 60) % 60)
    currentTime.innerHTML = cm + ':' + cs
}, false)


// like
var favIcon = document.querySelector('.favorite')
function handleFavorite() {
    favIcon.classList.toggle('active');
}


// repeat
var repIcon = document.querySelector('.repeat')
function handleRepeat() {
    if (music.loop == true) {
        music.loop = false
        repIcon.classList.toggle('active')
    }
    else {
        music.loop = true
        repIcon.classList.toggle('active')
    }
}

// volume
var volIcon = document.querySelector('.volume')
var volBox = document.querySelector('.volume-box')
var volumeRange = document.querySelector('.volume-range')
var volumeDown = document.querySelector('.volume-down')
var volumeUp = document.querySelector('.volume-up')

function handleVolume() {
    volIcon.classList.toggle('active')
    volBox.classList.toggle('active')
}

volumeDown.addEventListener('click', handleVolumeDown);
volumeUp.addEventListener('click', handleVolumeUp);

function handleVolumeDown() {
    volumeRange.value = Number(volumeRange.value) - 5
    music.volume = volumeRange.value / 100
}
function handleVolumeUp() {
    volumeRange.value = Number(volumeRange.value) + 5
    music.volume = volumeRange.value / 100
}

document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 38:
            event.preventDefault();
            audio_vol = audio.volume;
            if (audio_vol!=1) {
                try {
                    handleVolumeUp();
                }
                catch(err) {
                    audio.volume = 1;
                }
            }  
            break;

        case 37:
            event.preventDefault();
            vid_currentTime = audio.currentTime;
            audio.currentTime = vid_currentTime - 5;
        break;
       
       case 39:
            event.preventDefault();    
            vid_currentTime = audio.currentTime;
            audio.currentTime = vid_currentTime + 5;
        break;

       case 40:
            event.preventDefault();
            audio_vol = audio.volume;
            if (audio_vol!=0) {
                try {
                    handleVolumeDown();
                }
                catch(err) {
                    audio.volume = 0;
                }
            }
            break;
        }
};