//Reverse Text messages

const messages =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, in.";

function revMesssages(word) {
  const reversedWords = word.toLowerCase().split(" ").reverse();

  return reversedWords;
}

console.log(revMesssages(messages));

//Count vowels in a sentence

function findVowels(sentence) {
  let count = 0;
  const vowels = "aeiou";
  //    const word = sentence.toLowerCase().split("")
  sentence
    .toLowerCase()
    .split("")
    .forEach((word) => {
      if (vowels.includes(word)) {
        count++;
      }
    });
  return count;
}
console.log(findVowels("aeiousc"));

//

function isPalindrome(word) {
  const reversedWord = word.split("").reverse().join("");
  if (word === reversedWord) {
    return true;
  } else {
    return false;
  }
}

console.log(isPalindrome("nan"));

//Checking anagram

function isAnagram(firstWord, secondWord) {
  console.log(firstWord);
  console.log(secondWord);

  let value;
  firstWord
    .toLowerCase()
    .split("")
    .forEach((word) => {
      if (
        secondWord.includes(word) &&
        secondWord.length === firstWord.length &&
        secondWord !== firstWord
      ) {
        value = true;
      } else {
        value = false;
      }
    });
  return value;
}

console.log(isAnagram("act", "tac"));
