var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var passport = require('passport');

//***************************
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'college',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
//***************************
/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.user);
	console.log(req.isAuthenticated())
	res.render('home', {
		title: 'home'
	});
});
router.get('/add_class', function(req, res) {
	res.render('add_class')
});
router.get('/profile', authenticationMiddleware(), function(req, res) {
	res.render('profile', {
		title: 'profile'
	});
});

router.get('/login', function(req, res) {
	res.render('login', {
		title: 'Login'
	});
});

router.post('/login', passport.authenticate(
	'local', {
		successRedirect: '/student_panel',
		failureRedirect: '/login'

	}));

router.get('/register', function(req, res, next) {
	res.render('register', {
		title: 'Registration'
	});
});

router.get('/add', function(req, res, next) {
	res.render('add', {
		title: 'Add class'
	});
});

router.get('/delete', function(req, res, next) {
	res.render('delete', {
		title: 'Delete Class'
	});
});

router.get('/search_result', function(req, res, next) {
	res.render('search_result', {

	});
});

router.get('/search', function(req, res, next) {
	res.render('search', {

	});
});




router.post('/search_complete', function(req, res, next) {
	const name = req.body.name;
	const last_name = req.body.last_name;
	const search_query = "SELECT c.Name, c.Description, cl.Day, cl.Room, cl.Start_Time, cl.Finish_Time, c.Credits,c.Term, i.First_Name, i.Last_Name FROM class_schedule cl JOIN section s ON s.schedule_id = cl.ID JOIN instructor i ON s.instructor_id = i.ID JOIN course c ON c.name = s.course_name WHERE c.name ='" + name + "' OR i.last_name = '" + last_name + "';";
	connection.query(search_query, (error, results, fields) => {

		if (error) {
			throw error;
		}
		res.render('search_result', {

			results

		});
	});
});





router.post('/add', function(req, res, next) {

	const ID = req.body.ID;
	const Academic_year = req.body.Academic_year;
	const Term = req.body.Term;
	const Section_ID = req.body.Section_ID;
	const Student_ID = req.body.Student_ID;

	connection.query("INSERT INTO enrollment(ID,Academic_year,Term,Section_ID, Student_ID, Date_Enrolled) VALUES (?, ?, ?, ?, ?,NOW())", [ID, Academic_year, Term, Section_ID, Student_ID], (error, results, fields) => {
		if (error) {
			throw error;
		}
		res.redirect('/student_panel')
	});
});

router.post('/delete', function(req, res, next) {

	const Course_Name = req.body.Course_Name;
	const Student_ID = req.body.Student_ID;

	connection.query("DELETE e FROM enrollment e INNER JOIN section s ON e.Section_ID=s.ID WHERE e.Student_ID = '" + Student_ID + "' AND s.Course_Name='" + Course_Name + "';", (error, results, fields) => {
		if (error) {
			throw error;
		}
		res.redirect('/student_panel')
	});
});



router.post('/register', function(req, res, next) {
	//checn input if its valid
	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
	req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
	req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
	req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
	req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

	const errors = req.validationErrors();
	if (errors) {

		console.log(`errors: ${JSON.stringify(errors)}`);

		res.render('register', {
			title: 'Registration Error',
			errors: errors
		});
	} else {
		const first_name = req.body.first_name;
		const last_name = req.body.last_name;
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;

		const db = require('../db.js');
		//MAKE QUERY TO POST DATA TO database

		db.query('INSERT INTO user (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)', [first_name, last_name, username, email, password], function(error, results, fields) {
			if (error) throw error;

			db.query('SELECT LAST_INSERT_id() as user_id', function(error, results, fields) {
				if (error) throw error;

				const user_id = results[0];

				console.log(results[0]);
				req.login(user_id, function(err) {
					res.redirect('/login');

				});
			})
		})
	}


});

passport.serializeUser(function(user_id, done) {
	done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
	done(null, user_id);
});

function authenticationMiddleware() {
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

		if (req.isAuthenticated()) return next();
		res.redirect('/profile')
	}
}


module.exports = router;
