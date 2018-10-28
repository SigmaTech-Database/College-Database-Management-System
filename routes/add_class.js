const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'college'
});


const query_insert = "INSERT INTO enrollment (Academic_year) VALUES (?);";


router.post('/add_class', function(req, res) {

	const academic_year = req.body.academic_year;
	connection.query(query_insert, [academic_year], (error, results, fields) => {
		if (error) {
			throw error;
		}
		res.redirect('/')
	});


});

module.exports = router;