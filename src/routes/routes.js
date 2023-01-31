import request from 'request';
import { Router } from "express";
import passport from "passport";
import Player from '../models/Player.js';
import { isAuthenticated } from '../helpers/auth.js';
import Result from '../models/Result.js';

const router = Router();

//global variables
let correctAnswers = []; // to save the correct answers 
let questionList = []; // list of questions
let questionMatched = []; // to save the questions whose answers have been correct and that will be showed to the user

// index (main vista)
router.get('/', (req, res) => {
	res.render('index');
})

// form to sign in
router.get('/signin', (req, res) => {
	res.render('signin');
});

// sign in data sent
router.post('/signin', passport.authenticate('local', {
	successRedirect: "/login",
  	failureRedirect: "/signin",
  	failureFlash: true
}));

// view once the user has signed in correctly
router.get('/login', (req, res) => {
	console.log(req.body)
	let userData =  req.user;
	let name =  userData.user;
	res.render('login', {name});
})

// form to sign up
router.get('/signup', (req, res) => {
	res.render('signup');
});

// sign up data sent
router.post('/signup', async (req, res) =>  {
	let errors = [];
	const { user, email, password, confirm_password } = req.body;
	// to validate data
	if (password !== confirm_password) {
	  errors.push({ text: "Passwords do not match." });
	}
  
	if (password.length < 4) {
	  errors.push({ text: "Password must be at least 4 characters." });
	}
  
	if (errors.length > 0) {
	  return res.render("signup", {
		errors,
		user,
		email,
		password,
		confirm_password,
	  });
	}

	const playerFound = await Player.findOne({email:email});
	if(playerFound){
		req.flash('error_msg', 'This email is registered yet!');
		return res.redirect('/signup');
	}

	// to save user information in database
	const newPlayer = new Player({user, email, password});
	newPlayer.password = await newPlayer.encryptPassword(password);
	req.flash('success_msg', 'New player registered successfully!');
	await newPlayer.save();
	res.redirect('/signin');
});

// to get the questions from the trivia api
router.get('/questions', isAuthenticated, (req, res) => {
	request("https://the-trivia-api.com/api/questions?limit=21",(err,response,body)=>{
        if (!err){
            const data = JSON.parse(body);

			/* once the data has been collected, the goal is to create 
			an array with the three correct answers and the incorrect one, 
			arranged randomly; that array will be the rendered one for the user to play */

			data.forEach(element => {
				let questionArray = []; // where to save first both correct answers and the incorrect one
				let questionArraySpliced; // necessary variable to save the spliced element that will be put in the final answersList array 
				let randomQuestionArray = []; // to save the questions randomly
				questionArray.push(element.correctAnswer); // pushing the correct answer in the questionArray array
				
				/* pushing also the correct answer in the global variable correctAnswers because
				 it will be necessary later to use this variable from another route*/
				correctAnswers.push(element.correctAnswer);
				
				/* the global variable questionList array will be used later 
				 to show the results of the quiz*/
				questionList.push(element.question);
				
				
				for(let i=0; i<element.incorrectAnswers.length; i++){
					questionArray.push(element.incorrectAnswers[i]);
				}

				// creating the randomQuestionArray after splicing the questionArray
				for(let i=0; i<4; i++){
					questionArraySpliced = questionArray.splice(Math.floor(Math.random()*questionArray.length), 1);
					for(let j=0; j<questionArraySpliced.length; j++){
						randomQuestionArray.push(questionArraySpliced[j]);
					}
				}
				// creating the final answersList array that will be rendered for the user
				element.answersList = randomQuestionArray; 
        	});
			res.render('questions', {data});
    	};
	});
});


// to show the result of the quiz once it is submitted
router.post('/result', isAuthenticated, async (req, res) => {
	let result = 0; // counter of correct answers
	let hits = []; // array where to save the correct answers
	const {answers} = req.body;
	if(answers.length>21 || answers.length<21){
		return res.render('notAllowed');
	}
	
	for(let i=0; i<answers.length; i++){
		for(let j=0; j<correctAnswers.length; j++){
			if(answers[i] == correctAnswers[j]){
				hits.push(answers[i]);
				questionMatched.push(questionList[j]);
				result ++;
			}
		}
	}

	// saving the score in the database
	const scorePlayer = new Result({result});
	scorePlayer.user = req.user.id;
	await scorePlayer.save();
	
	res.render('result', {result, hits, questionMatched});
	correctAnswers = [];
	questionList = [];
	questionMatched = [];
	result = 0;
});

// logout, the user will be redirected to sign in page
router.get('/logout', (req, res, next) => {
	req.logout((err) => {
		if(err) {
			return next(err)
		}
	req.flash("success_msg", "You are logged out now.");
	res.redirect("/signin");
		
	});
});


export default router;

