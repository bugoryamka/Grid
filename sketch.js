let cols = 5; // Number of columns
let rows = 5; // Number of rows
let cellWidth, cellHeight; // Cell dimensions
let slider; // Slider for controlling visible elements

let circleSizes = [];
let circleAlphas = [];
let textAlphas = []; // Opacity for the text numbers

function setup() {
  let canvasWidth, canvasHeight;
  if (windowWidth < 768) {
    // Condition for smartphones
    canvasWidth = windowWidth / 1.5;
    canvasHeight = windowHeight / 1.5;
  } else {
    // Condition for desktops or larger screens
    canvasWidth = windowWidth / 3;
    canvasHeight = windowHeight / 1.5;
  }

  // Create canvas and attach it to the container
  canvas = createCanvas(canvasWidth, canvasHeight);
  cellWidth = width / cols;
  cellHeight = height / rows;

  // Load the Google Font (Make sure the link is included in your HTML file)
  textFont("Quicksand"); // Use the Google font

  // Set the text alignment and size
  textAlign(CENTER, CENTER);
  textSize(16);

  // Slider setup
  slider = createSlider(0, cols * rows, 0, 1);
  slider.style('width', '300px');
  slider.position((windowWidth - slider.width) / 2, windowHeight - 100);
  slider.class("range-style");

  // Initialize animation parameters
  for (let i = 0; i < cols * rows; i++) {
    circleSizes[i] = 0; // Start with invisible circles
    circleAlphas[i] = 0; // Fully transparent circles
    textAlphas[i] = 0; // Fully transparent text
  }
}

function draw() {
  background(220);

  let maxCounter = slider.value(); // Get slider value for the number of visible circles

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let index = j * cols + i; // Calculate index for 1D arrays
      let x = cellWidth * i + cellWidth / 2;
      let y = cellHeight * j + cellHeight / 2;

      // Animate the size and transparency of the circles and text
      if (index < maxCounter) {
        circleSizes[index] = lerp(circleSizes[index], 30, 0.1); // Grow the circle
        circleAlphas[index] = lerp(circleAlphas[index], 255, 0.1); // Fade in
        textAlphas[index] = lerp(textAlphas[index], 255, 0.1); // Fade in text
      } else {
        circleSizes[index] = lerp(circleSizes[index], 0, 0.1); // Shrink the circle
        circleAlphas[index] = lerp(circleAlphas[index], 0, 0.1); // Fade out
        textAlphas[index] = lerp(textAlphas[index], 0, 0.1); // Fade out text
      }

      // Draw the circle with the current size and transparency
      fill(200, 200, 200, circleAlphas[index]);
      noStroke();
      ellipse(x, y, circleSizes[index], circleSizes[index]);

      // Draw the number with animated opacity
      fill(0, 0, 0, textAlphas[index]);
      text(index + 1, x, y); // Start the numbers from 1
    }
  }
}

function windowResized() {
  let canvasWidth, canvasHeight;
  if (windowWidth < 768) {
    // Condition for smartphones
    canvasWidth = windowWidth / 1.5;
    canvasHeight = windowHeight / 1.5;
  } else {
    // Condition for desktops or larger screens
    canvasWidth = windowWidth / 3;
    canvasHeight = windowHeight / 1.5;
  }

  // Create canvas and attach it to the container
  canvas = createCanvas(canvasWidth, canvasHeight);
  cellWidth = width / cols;
  cellHeight = height / rows;
  slider.position((windowWidth - slider.width) / 2, windowHeight - 100);
  textAlign(CENTER, CENTER);
}
