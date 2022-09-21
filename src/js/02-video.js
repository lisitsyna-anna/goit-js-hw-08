import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const onTimeUpdate = function (event) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(event));
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));

const savedDataVideo = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (savedDataVideo) {
  player.setCurrentTime(savedDataVideo.seconds);
}
