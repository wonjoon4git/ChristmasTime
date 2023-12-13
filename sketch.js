let secParticles = [];
let minParticles = [];
let hourParticles = [];
let lastSec = -1;
let lastMin = -1;
let lastHour = -1;

function setup() {
  createCanvas(400, 500);
  lastMinute = minute(); // Initialize with the current minute
}


function draw() {
  
  // Festive background color
  background('#B22222'); // A shade of red

  let h = hour();
  let m = minute();
  let s = second();
  
  // Check if the minute has changed
  let currentMinute = minute();
  if (currentMinute !== lastMinute) {
    console.log(currentMinute); // Print the new minute
    lastMinute = currentMinute; // Update the lastMinute to the current minute
  }

  // Reset logic for each bin
  if (s === 0 && lastSec !== 0) {
    secParticles = [];
  }
  if (m === 0 && lastMin !== 0) {
    minParticles = [];
  }
  if (h === 0 && lastHour !== 0) {
    hourParticles = [];
  }

  lastSec = s;
  lastMin = m;
  lastHour = h;

  // Divide the screen into three bins
  let binHeight = height / 3;
  stroke('#FFFFFF'); // White lines
  strokeWeight(2); // Adjust the value to change the line thickness
  line(0, binHeight, width, binHeight);
  line(0, 2 * binHeight, width, 2 * binHeight);

  // Add new particles at the top of each bin
  if (secParticles.length < s) {
    secParticles.push(new Particle(2.5, 0));
  }
  if (minParticles.length < m) {
    minParticles.push(new Particle(4, binHeight));
  }
  if (hourParticles.length < h) {
    hourParticles.push(new Particle(6.5, 2 * binHeight));
  }

  // Update and display particles for each bin
  updateAndDisplayParticles(secParticles, binHeight);
  updateAndDisplayParticles(minParticles, 2 * binHeight);
  updateAndDisplayParticles(hourParticles, height);


  // Display particle count for each bin
  displayParticleCount(s, height / 3);
  displayParticleCount(m, (height / 3) * 2);
  displayParticleCount(h, height);

  
  // Display festive message
  textSize(22);
  fill('#FFFFFF'); // White text
  textStyle(ITALIC);
  textAlign(CENTER, CENTER);
  text('Merry Christmas & Happy New Year', width / 2, height / 2);
}

function updateAndDisplayParticles(particles, yMax) {
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.update();
    particle.display();
    if (particle.y > yMax) {
      particles.splice(i, 1); // Remove particle when it falls out of the bin
    }
  }
}

function displayParticleCount(time, yMax) {
  fill(255); // White text color
  textSize(13);
  textAlign(RIGHT, BOTTOM);
  text(time, width - 7, yMax - 5); // Adjust position as needed
}

class Particle {
  constructor(size, yStart) {
    this.size = size;
    this.x = random(width);
    this.y = yStart;
    this.speed = random(0.5, 1.5);
  }

  update() {
    this.y += this.speed; // Particle falls down
  }

  display() {
    noStroke();
    fill('#FFFFFF'); // White particles
    ellipse(this.x, this.y, this.size, this.size);
  }
}
