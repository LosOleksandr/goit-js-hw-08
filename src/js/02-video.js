import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const iframe = document.getElementById('vimeo-player');

const player = new Player(iframe);


const onPlay = function (data) {
  const currentTime = data.seconds;

  localStorage.setItem(LOCALSTORAGE_KEY, currentTime);
};

const storedTime = localStorage.getItem(LOCALSTORAGE_KEY);

player
  .setCurrentTime(storedTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'Range error':
        break;
    }
  });

player.setVolume(0.5);

player.on('timeupdate', throttle(onPlay, 1000));

window.addEventListener('keydown', evt => {
  if (evt.code === 'Space') player.pause();
});

window.addEventListener('keydown', evt => {
  if (evt.code === 'KeyF') player.getFullscreen();
});
