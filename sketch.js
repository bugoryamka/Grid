let cols = 5; // Number of columns
let rows = 5; // Number of rows
let cellWidth, cellHeight; // Cell dimensions
let slider; // Slider for controlling visible elements
let circleSizes = [];
let circleAlphas = [];
let textAlphas = []; // Opacity for the text numbers

function setup() {
  // Determine canvas size based on screen type
  let canvasWidth, canvasHeight;
  if (windowWidth < 768) { // Condition for smartphones
    canvasWidth = windowWidth / 1.5;
    canvasHeight = windowHeight / 1.5;
  } else { // Condition for desktops or larger screens
    canvasWidth = windowWidth / 3;
    canvasHeight = windowHeight / 1.5;
  }

  // Create canvas
  createCanvas(canvasWidth, canvasHeight);

  // Slider setup
  slider = createSlider(0, cols * rows, 0, 1);
  
  // Update slider width based on screen type
  if (windowWidth < 768) {
    slider.style('width', '200px'); // Smaller slider for smartphones
  } else {
    slider.style('width', '400px'); // Larger slider for desktops
  }

  // Center the slider horizontally and place it near the bottom
  centerSlider();
  slider.class("range-style");

  // Set font
  textFont('Quicksand');
  textAlign(CENTER, CENTER);

  // Initialize grid
  cellWidth = width / cols;
  cellHeight = height / rows;

  // Initialize animation parameters
  for (let i = 0; i < cols * rows; i++) {
    circleSizes[i] = 0;
    circleAlphas[i] = 0;
    textAlphas[i] = 0;
  }
}

function draw() {
  background(220);

  const maxCounter = slider.value();

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const index = j * cols + i;
      const x = cellWidth * i + cellWidth / 2;
      const y = cellHeight * j + cellHeight / 2;

      // Animate visibility
      if (index < maxCounter) {
        circleSizes[index] = lerp(circleSizes[index], 30, 0.1);
        circleAlphas[index] = lerp(circleAlphas[index], 255, 0.1);
        textAlphas[index] = lerp(textAlphas[index], 255, 0.1);
      } else {
        circleSizes[index] = lerp(circleSizes[index], 0, 0.1);
        circleAlphas[index] = lerp(circleAlphas[index], 0, 0.1);
        textAlphas[index] = lerp(textAlphas[index], 0, 0.1);
      }

      // Draw the circle
      fill(200, 200, 200, circleAlphas[index]);
      noStroke();
      ellipse(x, y, circleSizes[index]);

      // Draw the text
      fill(0, 0, 0, textAlphas[index]);
      text(index + 1, x, y);
    }
  }
}

function windowResized() {
  // Adjust canvas size and slider on window resize
  let canvasWidth, canvasHeight;
  if (windowWidth < 768) { // Condition for smartphones
    canvasWidth = windowWidth / 1.5;
    canvasHeight = windowHeight / 1.5;
  } else { // Condition for desktops or larger screens
    canvasWidth = windowWidth / 3;
    canvasHeight = windowHeight / 1.5;
  }

  resizeCanvas(canvasWidth, canvasHeight);

  // Recalculate grid dimensions
  cellWidth = width / cols;
  cellHeight = height / rows;

  // Update slider size and position
  if (windowWidth < 768) {
    slider.style('width', '200px'); // Smaller slider for smartphones
  } else {
    slider.style('width', '400px'); // Larger slider for desktops
  }

  // Recalculate the slider's position after resizing
  centerSlider();
}

// Function to center the slider
function centerSlider() {
  // Centering the slider horizontally
  slider.position((windowWidth - slider.width) / 2, windowHeight - 100);
}
