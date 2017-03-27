var GameScreen = function(assetManager, stage) {
    // On this screen the player has exactly five seconds to beat the clock
    "use strict";
    // custom event for next button
    var eventScreenComplete = new createjs.Event("playFinished");
    var eventScreenPrevious = new createjs.Event("playPrevious");
    // construct container to hold all sprites of screen
    var screen = new createjs.Container();
    screen.addChild(background);
    // construct hitspot sprite
    
	var started = false;
    
    // timer variables
    var timer = null;
    var countDown = 60;
    var txtTimer = null;
	
    
    
    // ------------------------------------------------------------ private methods
    function startTimer() {
        timer = setInterval(onTimerUpdate, 1000);
    }
    
    function stopTimer() {
        clearInterval(timer);
        countDown = 60;
        timer = null;
    }

        
    function onTimerUpdate(e) {
        console.log("time!");
        countDown--;
        txtTimer.text = String(countDown);
        // detect if game over
        if (countDown == 0) {
            userGuess = "";
            stopTimer();
        } else if (countDown <= 10) {
            createjs.Sound.play("timeSound");
        }
    }
    
    function onQuit(e){
        console.log("clicked on prev!");
        // telling the world the prev button has been clicked!
        stage.dispatchEvent(eventScreenPrevious);
    }
    
    function onPlay(e){
        console.log("Play has started!");
		started = true;
    }
    
    // ---------------------------------- public methods
    this.showMe = function() {
        // anything else that needs to be done when the screen is shown
        // ...
        stage.addChild(screen);
        //stage.addChild(ghost1)
    }
    this.hideMe = function() {
        stage.removeChild(screen);
       
    } 
    function onTick(e) {
		ghostMover1.updateMe();
		// update the stage!
		stage.update();
	}
	function loaded() { // Function called when the page has loaded.
		var canvas = document.getElementById("canvas"), // Canvas element to draw on.
			context = canvas.getContext("2d"), // Set the context to the 2D drawing API.
			score = 0, // Player score.
			time = 0, // How long the game has been playing.
			timeLimit = 10.0, // The time to play for.
			ghostX, // The x coordinate of the ghost being shown.
			ghostY, // The y coordinate of the ghost being shown.
			offsetLeft = canvas.offsetLeft, // Take into account the margin between the pages edge and the canvas element.
			offsetTop = canvas.offsetTop, // Take into account the margin between the pages edge and the canvas element.
			stopped = true, // Variable to tell the scrips whether the game is playing or not.
			deadX = [], // Array of the x values of dead ghosts.
			deadY = [], // Array of the y values of dead ghosts.
			ghostTiming = [], // Array of the times that ghosts died.
			bgColour = "blue"; // BAckground colour.
		function drawTitle() { // Function to draw the title screen.
			context.fillStyle = bgColour; // Set the colour of the rectangle.
			context.fillRect(0, 0, canvas.width, canvas.height); // Draw a rectangle.
			// Start button.
			var width = 200, // Width of the start button.
				height = 100, // Height of the start button.
				xStart = (canvas.width / 2) - width / 2, // Where the button starts.
				yStart = (canvas.height / 2) - height / 2; // Where the button starts.
			context.fillStyle = "red"; // Set the colour of the rectange to draw.
			context.fillRect(xStart, yStart, width, height); // Draw the rectangle.
			context.font = "15px Arial"; // Font of the text to draw.
			context.textAlign = "center"; // Alignment of the text to draw.
			context.fillStyle = "black"; // Colour of the text to draw.
			context.fillText("Start Game", canvas.width / 2, canvas.height / 2); // Draw the text.
			// Title text.
			context.font = "bold 15px Arial"; // Style of the text to draw.
			context.fillStyle = "red"; // Colour of the text.
			context.textAlign = "center"; // Alignment of the text.
			context.fillText("SCOTIA-GAMING PRESENTS", canvas.width / 2, canvas.height / 2 - 120); // Draw the text.
			context.fillText("THE GHOST SHIFT", canvas.width / 2, canvas.height / 2 - 100); // Draw the text.
			var listener = function(event) { // Function to manage click events.
				var x = event.pageX - offsetLeft, // Where the canvas clicked -> x coordinate.
					y = event.pageY - offsetTop; // Where the canvas was clicked -> y coordinate.
				if((x >= xStart) && (x <= xStart + width) && (y >= yStart) && (y <= yStart + height)) { // The click inside the area specified.
					canvas.removeEventListener("click", listener); // Remove the listener.
					startGame(); // Start the game.
				} // Else ignore the click.
			};
			canvas.addEventListener("click", listener, false); // Set the listener.
		}
		function setListener(x, y) { // Listener for the ghosts.
			var radius = 30, // Radius of the ghost
				listener = function(event) { // Click event manager.
					if(stopped == false) { // The game is playing.
						var xEvent = event.pageX - offsetLeft, // Get the coordinate of the click on the canvas.
							yEvent = event.pageY - offsetTop; // Get the coordinate of the click on the canvas.
						if((event.pageX >= (x - radius)) && (event.pageX <= (x + radius))) { // The click was inside the specified x value.
							if((event.pageY >= ghostY - radius) && (event.pageY <= ghostY + radius)) { // The click was inside the specified y value.
								score = score + 1; // Increment score.
								ghostX = randBetween(40, 460); // Get a random value for x.
								ghostY = randBetween(60, 460); // Get a random value for y.
								canvas.removeEventListener("click", listener); // Remove the listener.
								deadX[deadX.length] = x;
								deadY[deadY.length] = y;
								ghostTiming[ghostTiming.length] = time;
								drawGhost(ghostX, ghostY); // Draw the ghost.
							} // else do nothing.
						} // else do nothing.
					} // else do nothing.
				};
			canvas.addEventListener("click", listener, false); // Set the listener.
		}
		function drawGhost(x, y) { // Function to draw the ghost.
			var radius = 30; // Radius of ghost.
			// Draw body.
			context.beginPath();
			context.arc(x, y, radius, 0, 2 * Math.PI, false);
			context.fillStyle = "green";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw first eye.
			context.beginPath();
			context.arc((x + 5), (y - 2), 8, 2 * Math.PI, false);
			context.fillStyle = "black";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw second eye.
			context.beginPath();
			context.arc((x - 10), (y - 10), 8, 2 * Math.PI, false);
			context.fillStyle = "back";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw mouth.
			context.beginPath();
			context.arc((x - 8), (y + 13), 4, 2 * Math.PI, false);
			context.fillStyle = "black";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			setListener(x, y); // Set the click listener for the ghost.
		}
		function ghost1(x, y) {
			var radius = 30;
			// Draw body.
			context.beginPath();
			context.arc(x, y, radius, 0, 2 * Math.PI, false);
			context.fillStyle = "black";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw left eye.
			context.beginPath();
			context.arc((x - 10), (y - 3), 8, 2 * Math.PI, false);
			context.fillStyle = "green";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw right eye.
			context.beginPath();
			context.arc((x + 10), (y - 3), 8, 2 * Math.PI, false);
			context.fillStyle = "green";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw mouth.
			context.beginPath();
			context.arc((x), (y + 10), 5, 2 * Math.PI, false);
			context.fillStyle = "black";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
		}
		function ghost2(x, y) {
			var radius = 30;
			// Draw body.
			context.beginPath();
			context.arc(x, y, radius, 0, 2 * Math.PI, false);
			context.fillStyle = "black";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw left eye.
			context.beginPath();
			context.arc((x - 10), (y - 3), 8, 2 * Math.PI, false);
			context.fillStyle = "green";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw right eye.
			context.beginPath();
			context.arc((x + 10), (y - 3), 8, 2 * Math.PI, false);
			context.fillStyle = "green";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw mouth.
			context.beginPath();
			context.arc((x), (y + 10), 5, 2 * Math.PI, false);
			context.fillStyle = "green";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
		}
		function ghost3(x, y) {
			var radius = 30;
			// Draw body.
			context.beginPath();
			context.arc(x, y, radius, 0, 2 * Math.PI, false);
			context.fillStyle = "green";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw middle circle.
			context.beginPath();
			context.arc(x, y, radius - 10, 2 * Math.PI, false);
			context.fillStyle = "red";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
			// Draw inner circle.
			context.beginPath();
			context.arc(x, y, radius - 15, 2 * Math.PI, false);
			context.fillStyle = "green";
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0000";
			context.stroke();
		}
		function drawDeadGhosts() {
			var deadGhosts = deadX.length, // Amount of dead ghosts
				radius = 30, // Radius of ghost.
				index = 0;
			while(index < deadGhosts) {
				if(deadX[index] != null) {
					var x = deadX[index],
						y = deadY[index],
						died = ghostTiming[index];
					if(time - died <= 0.5) {
						ghost1(x, y);
					} else if(time - died <= 1) {
						ghost2(x, y);
					} else if(time - died <= 1.5) {
						ghost3(x, y);
					} else {
						deadX[index] = null;
						deadY[index] = null;
						ghostTiming[index] = null;
					}
				}
				index = index + 1;
			}
		}
		function drawStats() { // Function to draw the stats to the canvas.
			// Score and timing.
			context.font = "15px Arial";
			context.fillStyle = "red";
			context.textAlign = "left";
			context.fillText("Score: " + score, 10, 20);
			context.fillText("Time: " + time.toFixed(1), 10, 40); // toFixed(1) is to stop javascript outing times like 5.999999999999999987.
		}
		function randBetween(min, max) { // Function to generate a random number.
			return Math.floor(min + Math.random() * (max - min)); // Return the generated number.
		}
		function stopGame() { // Function to stop the game playing.
			stopped = true; // Tell the script the game is over.
			context.fillStyle = bgColour;
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.font = "20px Arial";
			context.fillStyle = "red";
			context.textAlign = "center";
			context.fillText("Well Done!", canvas.width / 2, canvas.height / 2);
			context.fillText("You scored: " + score, canvas.width / 2, canvas.height / 2 - 30);
			// Play again button.
			var width = 200, // Width of button.
				height = 100, // Height of button.
				xStart = (canvas.width / 2) - width / 2, // X position to start from.
				yStart = (canvas.height / 2) - (height / 2) + 100; // Y position to start from.
			context.fillStyle = "red";
			context.fillRect(xStart, yStart, width, height);
			context.font = "15px Arial";
			context.textAlign = "center";
			context.fillStyle = "black";
			context.fillText("Play Again", canvas.width / 2, (canvas.height / 2) + 100);
			var listener = function(event) { // Listener for the button click.
				var x = event.pageX, // X coordinate of the click.
					y = event.pageY; // Y coordinate of the click.
				if(x >= xStart && y >= yStart && x <= (xStart + width) && y <= (yStart + height)) {
					location.href="game.html"; // Restart the game.
					/*
				* Need to refresh because if you start straight away without refreshing,
				* the time speed increases ten-fold, so the game doesn't play as long.
				* Basically, keep this as it is.
				*/
				}
			};
			canvas.addEventListener("click", listener, false); // Add the listener.
		}
		function update() { // Function to update the canvas.
			if(stopped == false) { // If the game is still playing.
				context.fillStyle = bgColour;
				context.fillRect(0, 0, canvas.width, canvas.height);
				time = time + 0.1; // Increment the time.
				drawDeadGhosts(); // Draw dead ghost animations.
				drawGhost(ghostX, ghostY); // Draw the current ghost.
				drawStats(); // Draw the statistics of the game.
				if(time >= timeLimit) { // The game is over.
					clearInterval(update); // Stop updating the canvas values.
					stopGame(); // Stop the game.
				}
			}
		}
		function startGame() { // Function to start the game.
			time = 0; // Reset time.
			score = 0; // Reset score.
			stopped = false; // Tell the script the game is playing.
			context.fillStyle = bgColour;
			context.fillRect(0, 0, canvas.width, canvas.height);
			drawStats(); // Draw the game stats.
			ghostX = randBetween(40, 460); // Random x coordinate of a ghost.
			ghostY = randBetween(60, 460); // Randon y coordinate of a ghost.
			setInterval(update, 100); // Keep update running every 0.1 seconds.
			drawGhost(ghostX, ghostY); //Draw the first ghost.
		}
		drawTitle(); // Initial title screen.
	}
};
