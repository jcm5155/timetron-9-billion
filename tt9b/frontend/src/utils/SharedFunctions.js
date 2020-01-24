export const formatTime = (time, sigfig = 3, startPad = 2) => {
  let hours = Math.floor(time / 60 / 60)
    .toString()
    .padStart(startPad, "0");
  let minutes = (Math.floor(time / 60) % 60).toString().padStart(startPad, "0");
  let seconds = (time % 60)
    .toFixed(sigfig)
    .toString()
    .padStart(startPad, "0");
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

export const totalTime = segments => {
  return segments.reduce((accum, segment) => {
    return accum + segment.duration;
  }, 0);
};

export const segmentFormSanitizer = (num, unit) => {
  if (isNaN(num)) {
    return 0;
  } else {
    switch (unit) {
      case "s":
        return parseInt(num);
      case "m":
        return parseInt(num) * 60;
      case "h":
        return parseInt(num) * 60 * 60;
      default:
        return 0;
    }
  }
};
