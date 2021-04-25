const getSentence = (
  array,
  upperCase = false,
  replacementRegEx = [/,(?=[^\s])/g, ', ']
) => {
  const array_start = [];
  for (let i = 0; i < array.length - 1; i += 1) {
    array_start.push(array[i]);
  }
  let array_end;

  array.length > 1
    ? (array_end = [` und ${array[array.length - 1]}`])
    : (array_end = array);

  const arrays_join = array_start + array_end;

  let matchUpperCase;

  upperCase === true
    ? (matchUpperCase = [
        /^./,
        function (match) {
          return match.toUpperCase();
        }
      ])
    : (matchUpperCase = []);

  const replacements = new Map([replacementRegEx, matchUpperCase]);
  let result = arrays_join;
  replacements.forEach((value, key) => {
    result = result.replace(key, value);
  });

  return result;
};

export default getSentence;
