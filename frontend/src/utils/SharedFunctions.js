// Sorts segments using a routine's order property. Accepts a comma-separated string and an array of segments
export const sortSegmentsByOrder = (order, segments) => {
  const orderArr = order.split(",");
  return segments.sort((a, b) => {
    return orderArr.indexOf(a.id.toString()) - orderArr.indexOf(b.id.toString());
  });
};

// Formats moment timestamp into a shorthand string with custom significant figures and "0" prepadding
export const formatTime = (time, sigfig = 3, startPad = 2) => {
  const hours = Math.floor(time / 60 / 60)
    .toString()
    .padStart(startPad, "0");
  const minutes = (Math.floor(time / 60) % 60).toString().padStart(startPad, "0");
  const seconds = (time % 60)
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

// Calculates the combined time of an array of timesegments
export const totalTime = segments => {
  return segments.reduce((accum, segment) => {
    return accum + segment.duration;
  }, 0);
};

// Formats moment timestamp to a string to be used for the main time display
export const formatDisplay = (time, unit) => {
  switch (unit) {
    case "ms":
      return Math.floor(time.get("milliseconds") / 10)
        .toString()
        .padStart(2, "0");
    case "s":
      return time
        .get("seconds")
        .toString()
        .padStart(2, "0");
    case "m":
      return time
        .get("minutes")
        .toString()
        .padStart(2, "0");
    case "h":
      return time
        .get("hours")
        .toString()
        .padStart(2, "0");
    default:
      return 0;
  }
};

// Converts form inputs to seconds for database storage
export const segmentFormSanitizer = (num, unit) => {
  if (!num) {
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
