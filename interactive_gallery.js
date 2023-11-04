/* 
 * filename: interactive_gallery.js
 * This code is an example of an interactive image gallery in JavaScript. It allows users to view and navigate through a collection of images.
 */

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Global variable to store the current image index
let currentIndex = 0;

// Array of images
const images = [
  {
    id: 1,
    title: "Nature",
    url: "https://example.com/image1.jpg",
    description: "Beautiful nature scenery.",
    likes: 100,
    comments: ["Amazing!", "Love it!"]
  },
  {
    id: 2,
    title: "Abstract",
    url: "https://example.com/image2.jpg",
    description: "An abstract artwork.",
    likes: 50,
    comments: []
  },
  // More images...
];

// Function to display an image
function displayImage(index) {
  const image = images[index];
  console.log(`Title: ${image.title}`);
  console.log(`URL: ${image.url}`);
  console.log(`Description: ${image.description}`);
  console.log(`Likes: ${image.likes}`);
  console.log(`Comments: ${image.comments.join(", ")}`);
}

// Function to handle user input
function handleInput(input) {
  if (input === "next") {
    if (currentIndex === images.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    displayImage(currentIndex);
  } else if (input === "prev") {
    if (currentIndex === 0) {
      currentIndex = images.length - 1;
    } else {
      currentIndex--;
    }
    displayImage(currentIndex);
  } else if (input === "shuffle") {
    shuffleArray(images);
    currentIndex = 0;
    displayImage(currentIndex);
  } else if (input === "like") {
    images[currentIndex].likes++;
    displayImage(currentIndex);
  } else if (input.startsWith("comment")) {
    const comment = input.substring(8);
    images[currentIndex].comments.push(comment);
    displayImage(currentIndex);
  } else if (input === "exit") {
    console.log("Goodbye!");
    process.exit(0);
  } else {
    console.log("Invalid input. Try again.");
  }
}

// Main code loop
function main() {
  console.log("Welcome to the Interactive Image Gallery!");
  console.log("----------------------------------------");
  console.log("Commands:");
  console.log("next - View the next image");
  console.log("prev - View the previous image");
  console.log("shuffle - Shuffle the images");
  console.log("like - Like the current image");
  console.log("comment [text] - Add a comment to the current image");
  console.log("exit - Exit the gallery");

  displayImage(currentIndex);

  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("line", (input) => {
    handleInput(input);
  });
}

// Start the image gallery
main();