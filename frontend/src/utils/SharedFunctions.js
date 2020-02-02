// Sorts segments using a routine's order property. Accepts a comma-separated string and an array of segments
export const sortSegmentsByOrder = (order, segments) => {
  const orderArr = order.split(",");
  return segments.sort((a, b) => {
    return orderArr.indexOf(a.id.toString()) - orderArr.indexOf(b.id.toString());
  });
};

// Formats moment timestamp into string with custom "0" prepadding
export const formatTime = (time, displayType, pad = 2) => {
  const hours = time
    .get("hours")
    .toString()
    .padStart(pad, "0");
  const minutes = time
    .get("minutes")
    .toString()
    .padStart(pad, "0");
  const seconds = time
    .get("seconds")
    .toString()
    .padStart(pad, "0");

  switch (displayType) {
    case "main":
      if (minutes > 0) {
        return `${hours}:${minutes}:${seconds}`;
      } else {
        return `${seconds}.${time
          .get("milliseconds")
          .toString()
          .padStart(2, "0")
          .slice(0, 2)}`;
      }
    case "secondary":
      if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
      } else {
        return `${seconds}s`;
      }
    case "stopwatch":
      return `${hours}:${minutes}:${seconds}.${time
        .get("milliseconds")
        .toString()
        .padStart(3, "0")
        .slice(0, 3)}`;
    default:
      return;
  }
};

// Calculates the combined time of an array of timesegments
export const totalTime = segments => {
  return segments.reduce((accum, segment) => {
    return accum + segment.duration;
  }, 0);
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
