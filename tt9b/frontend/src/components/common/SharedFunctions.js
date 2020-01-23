export const formatTime = time => {
  let hours = Math.floor(time / 60 / 60)
    .toString()
    .padStart(2, "0");
  let minutes = (Math.floor(time / 60) % 60).toString().padStart(2, "0");
  let seconds = (time % 60).toString().padStart(2, "0");
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};
