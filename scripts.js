let countdown;
const timerDispay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

timer = (sec) => {
  clearInterval(countdown);
  const now = (Date.now());
  const then = now + sec * 1000;
  displayTimeLeft(sec);
  displayEndTime(then);

  countdown = setInterval( () => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    };
    displayTimeLeft(secondsLeft);
  }, 1000);
}

displayTimeLeft = sec => {
  const hour = Math.floor(sec / 3600);
  const min = Math.floor(sec%3600 / 60);
  const display = `${hour>0 ? hour+':' : ''}${min>9 ? min : '0'+min}:${sec%60>9 ? sec%60 : '0'+sec%60}`;
  document.title = display;
  timerDispay.textContent = display;
}

displayEndTime = timestamp => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const min = end.getMinutes();
  endTime.textContent = `Be back at ${hour>12 ? hour-12 : hour}:${min>9 ? min : '0'+min} ${hour>12 ? 'PM' : 'AM'}`;
}

function startTimer() {
  const sec = Number(this.dataset.time);
  timer(sec);
}

buttons.forEach( button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(this.minutes.value*60);
  this.reset();
});
