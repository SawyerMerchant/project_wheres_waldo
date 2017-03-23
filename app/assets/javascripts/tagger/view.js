function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  var clock = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.text(minutes + ":" + seconds);

    if (--timer < 0) {
      clearInterval(clock);
      alert("Times Up :(");
    }
  }, 1000);

  return {
    timer: timer
  };
}

jQuery(function ($) {
  var fiveMinutes = 60 * 5,
    display = $('#time');
  startTimer(fiveMinutes, display);
});
