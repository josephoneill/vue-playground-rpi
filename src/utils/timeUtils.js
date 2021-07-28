// function msToFormattedTime() that takes in a number of milliseconds and returns a string formatted as follows: hh:mm:ss.
// The function should not return a leading zero for hours or minutes.
export function msToFormattedTime(ms) {
  const longerThanHour = ms >= 1000 * 60 * 60;
  const substrStart = longerThanHour ? 11 : 14;
  const substrEnd = longerThanHour ? 8 : 5;
  
  const formattedTime = new Date(ms).toISOString().substr(substrStart, substrEnd);
  return formattedTime;
}
