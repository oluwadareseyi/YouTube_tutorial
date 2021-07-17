let r = 100;

let tauMaxSlider, sigmaMaxSlider, phiMaxSlider;
let tauDensitySlider, sigmaDensitySlider, phiDensitySlider;
let tauMaxValue, sigmaMaxValue, phiMaxValue;
let tauDensityValue, sigmaDensityValue, phiDensityValue;

let offset = 0;

function setup(){
  createCanvas(700, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  stroke(255);

  //Create slider!
  tauMaxValue = createDiv();
  tauMaxValue.class("valueDisplay");
  tauMaxSlider = createSlider(0.5, 4, 1, 0.1);
  tauMaxSlider.class("Slider");

  sigmaMaxValue = createDiv();
  sigmaMaxValue.class("valueDisplay");
  sigmaMaxSlider = createSlider(0, 360, 360, 10);
  sigmaMaxSlider.class("Slider");

  phiMaxValue = createDiv();
  phiMaxValue.class("valueDisplay");
  phiMaxSlider = createSlider(0, 360, 360, 10);
  phiMaxSlider.class("Slider");

  tauDensityValue = createDiv();
  tauDensityValue.class("valueDisplay");
  tauDensitySlider = createSlider(0.2, 1, 0.2, 0.01);
  tauDensitySlider.class("Slider");

  sigmaDensityValue = createDiv();
  sigmaDensityValue.class("valueDisplay");
  sigmaDensitySlider = createSlider(10, 45, 45, 1);
  sigmaDensitySlider.class("Slider");

  phiDensityValue = createDiv();
  phiDensityValue.class("valueDisplay");
  phiDensitySlider = createSlider(10, 45, 45, 1);
  phiDensitySlider.class("Slider");
}

function draw(){
  background(230, 50, 15, 100);
  orbitControl(4, 4);//Mouse control

  let tauDensityMappedVal = map(tauDensitySlider.value(), 0.2, 1, 1, 0.2);
  let sigmaDensityMappedVal = map(sigmaDensitySlider.value(), 10, 45, 45, 10);
  let phiDensityMappedVal = map(phiDensitySlider.value(), 10, 45, 45, 10);

  rotateX(65);

  for(let tau = tauMaxSlider.value(); tau < tauMaxSlider.value()+1; tau += tauDensityMappedVal){
    for(let sigma = 0; sigma < sigmaMaxSlider.value(); sigma += sigmaDensityMappedVal){
      for(let phi = 0; phi < phiMaxSlider.value(); phi += phiDensityMappedVal){
        let x = r * sinh(tau) * cos(phi+offset) / (cosh(tau) - cos(sigma+offset));
        let y = r * sinh(tau) * sin(phi+offset) / (cosh(tau) - cos(sigma+offset));
        let z = r * sin(sigma+offset) / (cosh(tau) - cos(sigma+offset));

        strokeWeight(5);
        stroke(phi, 50, 255);
        point(x, y, z);
      }
    }
  }

  tauMaxValue.html("tau max value: " + tauMaxSlider.value());
  sigmaMaxValue.html("sigma max value: " + sigmaMaxSlider.value());
  phiMaxValue.html("phi max value: " + phiMaxSlider.value());

  let tauDensityDisplayVal = int(map(tauDensitySlider.value(), 0.2, 1, 1, 55));
  let sigmaDensityDisplayVal = int(map(sigmaDensitySlider.value(), 10, 45, 1, 36));
  let phiDensityDisplayVal = int(map(phiDensitySlider.value(), 10, 45, 1, 36));

  tauDensityValue.html("tau density value: " + tauDensityDisplayVal);
  sigmaDensityValue.html("sigma density value: " + sigmaDensityDisplayVal);
  phiDensityValue.html("phi density value: " + phiDensityDisplayVal);

  offset -= 0.1;
}

function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}
