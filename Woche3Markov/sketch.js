let canvasX = 1000;
let canvasY = 1000;

let markovWords = new Map();
let markovString = "";
let textComplete = false;

let texts = 1;
let textsRead = 0;

let font;
function preload() {
  font = loadFont('./SquareSquads.otf');
}

function setup() {
  createCanvas(canvasX, canvasY, WEBGL);
  textFont(font);
  background(200);
  loadFont()
  document.oncontextmenu = () => false;

  readFile("Book1firstPart.txt", generateMarkovList);
  //readFile("Book1secondPart.txt", generateMarkovList);
  //readFile("Book2FullText.txt", generateMarkovList);

}

let angle = 0;
let angleDecrement = 0.0345;
function draw() {
  background(200);
  lights();
  point(0, 0, 0);
  if (textComplete) {
    drawWordOnCircle(markovString.split(""), angle, angleDecrement);
    angle += 0.01;
    //drawDonutText(markovString.split(" "), 100, 40);
/*
    for (let index = 0; index < TWO_PI; index += 0.1) {
      drawCylinder(markovString.split(" "), 30, 20, 5, [sin(index) * 100, cos(index) * 100]);
    }*/
    let i = 0;
  }
}

function readFile(filename, callback) {
  loadStrings(filename, function (lines) {
    let words = [];
    let currentWord = "";

    lines.forEach(line => {
      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        // If character is a letter, add it to currentWord
        if (char.match(/[a-zA-Z]/)) {
          currentWord += char;
        } else if (char === ',' || char === '.') {
          // If character is a comma or period, count it as a separate word
          if (currentWord !== '') {
            words.push(currentWord);
            currentWord = '';
          }
          words.push(char);
        } else if (char.match(/\s/)) {
          // If character is a whitespace, end current word and start a new one
          if (currentWord !== '') {
            words.push(currentWord);
            currentWord = '';
          }
        }
      }
      // Push the last word if it's not empty
      if (currentWord !== '') {
        words.push(currentWord);
        currentWord = '';
      }
    });

    callback(words);
  });
}

function handleMarkovListFinished() {
  textsRead += 1;
  if (textsRead >= texts) {
    console.log("Read all texts");
    // Convert the keys of the map into an array
    let wordsArray = Array.from(markovWords.keys());
    // Select a random word
    let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    // Generate the Markov text
    generateMarkovText(200, "the");
    console.log(markovString);
    console.log(markovWords);

    drawWordsRandomLine(markovString.split(" "));
    textComplete = true;
    console.log("Finished creating MarkovWords Amount; " + markovWords.length);

    //drawWordsSinus(markovString.split(" "));
    /*
    console.log("Saving...");

    // Convert markovWords Map to an array of pairs, where each pair is a key and an array
    const markovWordsArray = Array.from(markovWords, ([key, value]) => [key, Array.from(value)]);
    localStorage.setItem('markovWords', JSON.stringify(markovWordsArray));

    loadMarkovData();*/
  }
}
function drawWordsRandomLine(words) {
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(0, 102, 153);

    let direction = p5.Vector.random2D();  // Get a random direction
    direction.mult(width / 2);  // Multiply by half the width of the canvas
    let midpoint = createVector(width / 2, height / 2);  // Get the midpoint of the canvas
    let start = p5.Vector.add(midpoint, direction);  // Calculate the start and end points of the line
    let end = p5.Vector.sub(midpoint, direction);
    direction.normalize();  // Normalize the direction vector

    let numWords = words.length;
    let distBetween = p5.Vector.dist(start, end) / numWords;  // Calculate the distance between each word

    for (let i = 0; i < numWords; i++) {
        let wordPos = p5.Vector.add(start, p5.Vector.mult(direction, distBetween * i));  // Calculate the position for each word
        text(words[i], wordPos.x, wordPos.y);
    }
}


let wordIndexMap = new Map();  // A new map to store the indexes of each word

function generateMarkovList(words) {
  //console.log(words);
  console.log("Generating Markov List for: " + words.length + " words.");

  for (let index = 0; index < words.length; index++) {
    let currentWord = words[index];

    if (!markovWords.has(currentWord)) {
      let wordIndexes;

      // Check if we've already stored the indexes for this word
      if (wordIndexMap.has(currentWord)) {
        wordIndexes = wordIndexMap.get(currentWord);
      } else {
        wordIndexes = getWordIndexes(words, currentWord);
        wordIndexMap.set(currentWord, wordIndexes);
      }

      //console.log("WordIndexes: " + wordIndexes);
      createWordWeight(currentWord, wordIndexes, words);
    } else {
      let weights = markovWords.get(currentWord);
      let wordIndexes = wordIndexMap.get(currentWord);  // Retrieve the stored indexes
      createWordWeight(currentWord, wordIndexes, words, weights);
    }
  }
  console.log("Finished reading text" + textsRead);
  handleMarkovListFinished();
}

function createWordWeight(startWord, wordIndexes, words, weight = []) {
  let nextWords = [];
  //console.log(wordIndexes);
  for (let index = 0; index < wordIndexes.length; index++) {
    let nextWordIndex = wordIndexes[index] + 1;
    let nextWord = words[nextWordIndex];
    nextWords.push(nextWord);
  }

  let totalWords = nextWords.length;
  //console.log("StatWord: " + startWord);
  //console.log("nextwords: " + nextWords.length);

  for (let index = 0; index < nextWords.length; index++) {
    let currentWord = nextWords[index];
    let wordCountIndexes;
    if (wordIndexMap.has(currentWord)) {
      wordCountIndexes = wordIndexMap.get(currentWord);
    } else {
      wordCountIndexes = getWordIndexes(nextWords, currentWord);
      wordIndexMap.set(currentWord, wordCountIndexes);
    }
    let wordCount = wordCountIndexes.length;

    // Find the weight entry for the current word
    let weightEntry = weight.find(([word, _]) => word === currentWord);
    if (weightEntry) {
      // If the weight entry exists, set the weight to the new value
      weightEntry[1] = wordCount / totalWords;
    } else {
      // If the weight entry does not exist, create a new one
      weight.push([currentWord, wordCount / totalWords]);
    }

  }

  //console.log("Weightlength:" + weight.length);
  markovWords.set(startWord, weight);
}

function generateMarkovText(wordLength, startWord) {
  if (wordLength < 0) {
    return;
  } else {
    // 1. Create a random number between 0 and 1
    let randomNumber = Math.random();

    // 2. Get the weight array from the map for the current startWord
    let weightArray = markovWords.get(startWord);

    // 3. Get the next word by comparing the random number with the weights
    let nextWord = '';
    let accumulatedWeight = 0;
    for (let i = 0; i < weightArray.length; i++) {
      let [word, weight] = weightArray[i];
      accumulatedWeight += weight;
      if (randomNumber < accumulatedWeight) {
        nextWord = word;
        break;
      }
    }

    if (nextWord === startWord) {
      let wordsArray = Array.from(markovWords.keys());
      nextWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    }

    // 4. Add the next word to the markovString
    markovString += nextWord + ' ';

    // 5. Recursively call generateMarkovText with the next word and decrease wordLength
    generateMarkovText(wordLength - 1, nextWord);
  }
}


//Returns an int array with indexes where the wordtofind can be found inside the words array
function getWordIndexes(words, wordToFind) {
  let indexes = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i] === wordToFind) {
      indexes.push(i);
    }
  }
  return indexes;
}

function loadMarkovData() {
  console.log("Loading...");
  const markovWordsStr = localStorage.getItem('markovWords');

  if (markovWordsStr) {
    // Convert string back to array
    const markovWordsArray = JSON.parse(markovWordsStr);

    // Convert array back to Map, restoring arrays as values
    markovWords = new Map(markovWordsArray.map(([key, value]) => [key, value.map(item => [item[0], item[1]])]));
  }

  console.log("loaded markovWords from file amount: " + markovWords.length);
}