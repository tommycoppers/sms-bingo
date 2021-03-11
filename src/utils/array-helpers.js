function shuffle(arr) {
  arr = arr.slice(); // Copy the array
  let len = arr.length;
  let i;

  // While there remain elements to shuffle…
  while (len) {
    // Pick a remaining element…
    // And swap it with the current element.
    i = Math.floor(Math.random() * len--);
    [arr[len], arr[i]] = [arr[i], arr[len]];
  }

  return arr;
}

export { shuffle };
