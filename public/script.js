console.log("in");

var socket;

// this is necessary for p5
function setup(){
	console.log('gah!')
	//creating canvas 500x500px with black background
	createCanvas(500,500);
	background(0);
	//telling socket where client can connect to server
	//if you were to deploy, change url
	socket = io.connect('http://localhost:3000');

	socket.on('mouse', function(data){
		fill(0,0,255);
		noStroke();
		ellipse(data.x, data.y, 15, 15);
	});
}

function draw(){
	//will not use for code-along
}

function mouseDragged(){
	fill(255);
	noStroke();
	ellipse(mouseX, mouseY, 15, 15);
	//want to send data to server about mouse position
	sendMouse(mouseX, mouseY);
}

function sendMouse(xpos, ypos){
		var data = {
		x: xpos,
		y: ypos
	}
	socket.emit('mouse', data);
}
