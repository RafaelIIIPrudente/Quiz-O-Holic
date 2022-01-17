//selecting all required elements
let informationBox = document.querySelector(".informationBox");
let optionList = document.querySelector(".optionList");
let quizBox = document.querySelector(".quizBox");
let resultBox = document.querySelector(".resultBox");
let timeFrame = document.querySelector("header .timeFrame");
let countDown = document.querySelector(".timer .countDown"); 
let timeCount = document.querySelector(".timer .timerSeconds");

// if continue button is clicked
function continueButton() {
  showQuestions(0); //calling showQuestions function
  questionCount(1); //calling questionCount function
  startTimer(15); //calling startTimer function
  displayQuizBox(); //calling displayQuizBox function
  dontDisplayInfoBox(); //calling dontDisplayInfoBox function
  playMusic(); //calling playMusic function
}

let timeValue =  15;
let countingQuestionsNumber = 0;
let questionNumber = 1;
let userScore = 0;
let counter;

// if replayButton button is clicked
function replayButton() {
  timeValue = 15; 
  countingQuestionsNumber = 0;
  questionNumber = 1;
  userScore = 0;
  widthValue = 0;
  showQuestions(countingQuestionsNumber); //calling showQuestions function
  questionCount(questionNumber);
  clearInterval(counter); //clear counter
  startTimer(timeValue); //calling startTimer function
  displayQuizBox();
}

// if quit button clicked
function quitButton() {
  document.location = 'home.html'  //go back to the home page
}

let nextQuestionButton = document.querySelector("footer .nextButton");
let questionCounter = document.querySelector("footer .totalQuestion");

// if Next button clicked
function nextButton() {
  if (countingQuestionsNumber < questions.length - 1){ //if number of questions is less than total question length
    countingQuestionsNumber++; //increment 
    questionNumber++; //increment the question number value
    showQuestions(countingQuestionsNumber); //calling showQuestions function
    questionCount(questionNumber); //passing question number value to questionCount
    clearInterval(counter); //clear counter
    startTimer(timeValue); //calling startTimer function

  } else {
    clearInterval(counter); //clear counter
    showResult(); //calling showResult function
    dontDisplayQuizBox()
  }
}

// getting questions and options from array
function showQuestions(index) {
  let questionText = document.querySelector(".questionText");

	//creating a new span and div tag for question and option and passing the value using array index
	let questionTag = '<span>'+ questions[index].numb + "." + questions[index].question +'</span>';
	
	for (let i = 0; i < questions[index].options.length; i += 1) { 
    let options = questions[index].options[i]; // it is here where we added a loop to display the options
		let optionTag= '<div class="option"><span>'+ options +'</span></div>';
		optionList.innerHTML += `${optionTag}`; //adding new div tag inside option List
	}
	questionText.innerHTML = questionTag; //adding new span tag inside question Text

	let option = optionList.querySelectorAll(".option");

	// set onclick attribute to all available options
	for (i=0; i < option.length; i++) {
		option[i].setAttribute("onclick", "optionSelected(this)");
	}
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if the user clicked on option
function optionSelected(answer) {
	clearInterval(counter); //clear counter
	let userAns = answer.textContent; //getting user selected option
	let correcAns = questions[countingQuestionsNumber].answer; //getting correct answer from array
	let allOptions = optionList.children.length; //getting all option items
	
	if (userAns === correcAns) { //if user selected option is equal to array's correct answer
		userScore += 1; //upgrading score value with 1
		answer.insertAdjacentHTML("beforeEnd", tickIconTag); //adding tick icon to correct selected option
		playCorrectMusic();
		console.log("Correct Answer");
		console.log("Your correct answers = " + userScore);
		setTimeout(function() {
			optionList.innerHTML="";
		}, 3000);
	
	} else {
		answer.insertAdjacentHTML("beforeEnd", crossIconTag); //adding cross icon to correct selected option
		playWrongMusic();
		console.log("Wrong Answer");
		setTimeout(function() {
			optionList.innerHTML="";
		}, 3000);

		for (i = 0; i < allOptions; i++) {
			if (optionList.children[i].textContent === correcAns) { //if there is an option which is matched to an array answer 
				optionList.children[i].insertAdjacentHTML("beforeEnd", tickIconTag); //adding tick icon to matched option
				console.log("Auto selected correct answer.");
			}
		}
	}
}

function showResult() {
	let scoreText = resultBox.querySelector(".scoreText");
	playCongratsMusic(); //play congratulations music
	if (userScore === 10) { 
		
		let scoreTag =
		 '<span><h2>Quiz Completed!</h2> Congrats! 🎉, You got <p style="font-weight: bold; font-size: 50px; color:green">'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
		scoreText.innerHTML = scoreTag;  
	}
	else if (userScore > 6) { 
		let scoreTag = '<span><h2>Quiz Completed!</h2> Nice 😎, You got <p style="font-weight: bold; font-size: 50px; color:yellow">'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else { 
		let scoreTag = '<span><h2>Quiz Completed!</h2> Sorry 😐, You got only <p style="font-weight: bold; font-size: 50px; color:red">'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
		scoreText.innerHTML = scoreTag;
	}
}

function startTimer(time) {
	counter = setInterval(timer, 1000);
	function timer() {
		timeCount.textContent = time; //changing the value of timeCount with time value
		time--; //decrement the time value
		if (time < 9) { 
			let addZero = timeCount.textContent; 
			timeCount.textContent = "0" + addZero; //add a 0 before time value
		}
		if (time < 0) { 
			clearInterval(counter); //clear counter
			countDown.textContent = "Time Off"; //change the time text to time off
			let allOptions = optionList.children.length; //getting all option items
			let correcAns = questions[countingQuestionsNumber].answer; //getting correct answer from array
			setTimeout(function() {
				optionList.innerHTML="";
			}, 3000);
			
			for (i=0; i < allOptions; i++) {
				if (optionList.children[i].textContent === correcAns) { //if there is an option which is matched to an array answer
					optionList.children[i].insertAdjacentHTML("beforeEnd", tickIconTag); //adding tick icon to matched option
					console.log("Time Off: Auto selected correct answer.");
				}
			}
		}
	}
}

function questionCount(index) {
	//creating a new span tag and passing the question number and total question
	let totalQueCounTag = '<span style="font-weight: bold"><br/>'+ index +' of '+ questions.length +' Questions</span>';
	questionCounter.innerHTML = totalQueCounTag;  
}

function dontDisplayInfoBox() { 
	document.querySelector(".informationBox").style.display="none"; 
}

function dontDisplayQuizBox() { 
	document.querySelector(".quizBox").style.display="none"; 
}

function displayQuizBox() { 
	document.querySelector(".quizBox").style.display="block"; 
}

function playMusic() {
	let music = new Audio (href='music/1.mp3');
	music.play();
}

function playCorrectMusic() {
	let music = new Audio (href='music/correct.mp3');
	music.play();
}

function playWrongMusic() {
	let music = new Audio (href='music/wrong.mp3');
	music.play();
}

function playCongratsMusic() {
	let music = new Audio (href='music/congrats.mp3');
	music.play();
}

