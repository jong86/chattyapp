function randomColor() {
  const letters = '56789ABC';

  let string = '#';

  for (let i = 0; i < 6; i++) {
    const rand = Math.floor(Math.random() * letters.length);
    console.log(rand);
    string += letters[rand];
  }

  return string;

}

export default randomColor;