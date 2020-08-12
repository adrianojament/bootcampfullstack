function leftPad(value, count = 2, char = '0') {
  let valorCaracter = value.toString();
  let newValue = valorCaracter;

  if (valorCaracter.length < count) {
    for (let index = 0; index < count - valorCaracter.length; index++) {
      newValue = char + valorCaracter;
    }
  }
  return newValue;
}

function getNewTimestamp() {
  const now = new Date();
  let result = '';
  result += leftPad(now.getDate());
  result += '/';
  result += leftPad(now.getMonth() + 1);
  result += '/';
  result += now.getFullYear();
  result += ' ';
  result += leftPad(now.getHours());
  result += ':';
  result += leftPad(now.getMinutes());
  result += ':';
  result += leftPad(now.getSeconds());
  result += '.';
  result += leftPad(now.getMilliseconds(), 3);

  return result;
}

export { getNewTimestamp };
