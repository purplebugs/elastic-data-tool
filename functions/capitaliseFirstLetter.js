export const capitaliseFirstLetter = (phrase) => {
  const words = phrase.trim().toLowerCase().split(" ");

  const result = [];

  words.forEach((word) => {
    if (word !== "") {
      result.push(word[0].toUpperCase() + word.substring(1));
    }
  });

  return result.join(" ");
};
