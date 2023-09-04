import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframeEl = document.querySelector('iframe');
const player = new Player(iframeEl);

//Отслеживание события timeupdate и сщхранение в локальном хранилище

const takeTime = function (data) {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
  //   console.log(resultTime);
};

player.on('timeupdate', throttle(takeTime, 1000));

//Перезагрузка страницы

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
    seconds = localStorage.getItem('videoplayer-current-time');
    console.log(seconds);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        alert('The time was less than 0 or greater than the video’s duration!');
        break;

      default:
        alert('Some other error occurred!');
        break;
    }
  });
