$(document).ready(function(){
	var mainContent = $("#main-content");
	var imageRow = $("#image-row");
	var largeWords = $("#large-words");
	var faIcon = $(".fa");
	var background = $(".container-fluid");
	var roundsLeftMessage = $("#rounds-left");
	var averageTimeMessage = $("#average-time");
	var playAgainMessage = $("#play-again-text");
	var okToClick = false;
	var averageTimeArray = [];
	var totalRounds = 3;
	var roundsLeft = totalRounds;
	var nextRound = 1;
	var createdTime, clickedTime, reactionTime;
	var colorToClick, colorRGBToClick;
	var colorArray = ["RED", "YELLOW", "GREEN", "PURPLE"];
	var colorRGBArray = ["rgb(243, 89, 100)", "rgb(228, 208, 128)", "rgb(146, 234, 143)", "rgb(231, 168, 245)"];

	function centerRow(thisRow){
		var windowHeight = $(window).height();
		var rowHeight = thisRow.height();

		thisRow.css("top", windowHeight/2 - rowHeight/2);
	}

	function cycleTextDisplay(n){
		var counter = n;
		var number;

		var setIntervalId = setInterval(function(){
			if(counter == 0){
				mainContent.fadeOut(1500);
				faIcon.removeClass("fa-spin");
				faIcon.fadeOut(1500);
				counter++;
			} else if(counter == 1){
				mainContent.fadeIn(1500);
				largeWords.text("Round " + nextRound + "...");
				mainContent.fadeOut(1500);
				counter++;
			} else {
				number = randomNumber();
				colorToClick = colorArray[number];
				colorRGBToClick = colorRGBArray[number];
				largeWords.text("Click On " + colorToClick + "!");
				mainContent.fadeIn(1500);
				mainContent.fadeOut(1500);
				counter++;
			}
			if(counter == 3){
				clearInterval(setIntervalId);
				setTimeout(function(){
					okToClick = true;
					background.removeClass("background-fade");
					changeBackgroundColors();
				}, 3250);
			}
		}, 3000);
	}

	function randomNumber(){
		var number = Math.random();
		
		number = number*(colorArray.length-1);
		number = Math.round(number);
		return number;
	}	

	function changeBackgroundColors(){
		var thisSetInterval = setInterval(function(){
			background.css("background-color", colorRGBArray[randomNumber()]);
			if(background.css("background-color") == colorRGBToClick){
				createdTime = Date.now();
				clearInterval(thisSetInterval);
			}
		}, 2000);
	}

	function getAverageTime(){
		var result = 0;

		for(i = 0; i < averageTimeArray.length; i++){
			result += averageTimeArray[i];
		}
		result = result / averageTimeArray.length;
		return result.toFixed(2);
	}
	
	function newRound(){
		mainContent.fadeOut(1500);
		faIcon.fadeOut(1500);
		averageTimeMessage.fadeOut(1500);
		roundsLeftMessage.fadeOut(1500);
		background.addClass("background-fade");
		background.css("background-color", "#87CEFA");
		cycleTextDisplay(1);
	}

	function newGame(){
		newRound();
		playAgainMessage.fadeOut(1500);
		nextRound = 1;
		roundsLeft = totalRounds;
		averageTimeArray = [];
	}

	background.click(function(){
		if(background.css("background-color") == colorRGBToClick && mainContent.css("display") == "none"){
			roundsLeft--;
			roundsLeftMessage.text("Rounds Left: " + roundsLeft);
			clickedTime = Date.now();
			reactionTime = clickedTime - createdTime;
			averageTimeArray.push(reactionTime);
			averageTimeMessage.text("Average Time: " + getAverageTime() + 'ms');
			faIcon.removeClass("fa-hourglass");
			faIcon.addClass("fa-play-circle");
			largeWords.text(reactionTime + "ms");
			okToClick = false;

			mainContent.show();
			roundsLeftMessage.show();
			averageTimeMessage.show();
			faIcon.show();
			if(roundsLeft == 0){
				playAgainMessage.show();
			}
		} else {
			if(okToClick){
				imageRow.show();
				imageRow.delay(250).fadeOut(1000);
			}
		}
	})

	faIcon.click(function(){
		if($(this).hasClass("fa-play-circle")){
			if(roundsLeft != 0){
				newRound();
				nextRound++;
			} else {
				newGame();
			}
		}
	})

	$(window).resize(function(){
		centerRow(mainContent);
		centerRow(imageRow);
	});

	centerRow(mainContent);
	centerRow(imageRow);
	cycleTextDisplay(0);

});