let devices = [];
let numberOfDeviceParameters;
let sliders = [];
let offset = 10;
let f = 0;
let colors   =  ["#ff0000","#feb30f","#0aa4f7","#ffffff"];
let nodes = [];
let border = 300;
let mySize;

async function setup() {

  webAudioContextSetup();
  
  let canvas = createCanvas(400, 400);
  canvas.parent('p5CanvasContainer');


  await RNBOsetup('export/patch.simple-sampler.json', context); 

  createOutputNode();

  makeP5jsSliders(0); 
  
  createCanvas(w=800, w, WEBGL);
	
   fps = 24
   frameRate(fps)
	
   objs = new Obj()
}

// Sketch title: machine learning
// Sketch author: garabatospr
// Ported from openprocessing at https://openprocessing.org/sketch/1399848
function draw() {

  //IMPORTANT: Make sure you're checking that the sliders array is full before you use it

  if (sliders.length > 0) {

//   devices[0].parameters[0].value = mouseX;
//   devices[0].parameters[2].value = mouseY*10;
  
  background(0)
  push()
  objs.draw()
  pop()
  
	//background(100);

	for(let i=0; i < nodes.length;i++)
	{
		nodes[i].display();
	}


	//noFill();
	//strokeWeight(10);
	//stroke(100);
	if (frameCount > 500)
	{
		noLoop();
	}
  }
}
class node
{
	
	constructor(x,y,mySize)
	{
		this.x0 = x;
		this.y0 = y;
		this.x = x;
		this.y = y;
		this.size = mySize;
		this.step = random([60,120]);
		this.color = random([generateColor(10),color(100)]);
		this.strokeWidth = 5;
		this.strokeColor = random([generateColor(10),color(100)]);
	}
	
	
	display() 
	{
		
		let oldX = this.x;
		let oldY = this.y;
		
		let ranAng1 = random([0,PI/2,PI,3*PI/2]);
		let ranAng2 = random([0,PI/2,PI,3*PI/2]);
		
		this.x += this.step*cos(ranAng1);
    this.y += this.step*sin(ranAng2);
		
		let temp = this.step/2;
		strokeWeight(1);
		stroke(0);
		
		if ((this.x > temp*3) & (this.x  < width - temp*3) & (this.y > temp*3) & (this.y < height - temp*3))
		{
			// draw node 
			
			fill(0);
		  fill(this.color);
			strokeWeight(1);
		  ellipse(oldX,oldY,temp,temp);
		  fill(0);
			noStroke();
			ellipse(oldX,oldY,temp/3,temp/3);
			
			// draw line

			strokeWeight(this.strokeWidth);
			addBlur();
			stroke(this.strokeColor);
			line(oldX,oldY,this.x,this.y);
			
				
		}

	}
}


function addBlur(mySize)
{
	drawingContext.shadowOffsetX = mySize*0.05;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 3;
  drawingContext.shadowColor = 'black';
}

function generateColor(scale) {
	let temp = color(colors[floor(random(0,4))]);
	myColor = color(hue(temp) + randomGaussian() * scale,
		saturation(temp) + randomGaussian() * scale,
		brightness(temp) + randomGaussian() * scale,
		random(99,100));
	return myColor;
}

export function sketch(p) {
    p.setup = () => setup(p);
    p.draw = () => draw(p);
	p.addBlur = () => addBlur(p);
	p.generateColor = () => generateColor(p);
    // and so on for other p5 functions like mousePressed, keyPressed, etc.
};

export { sketch };