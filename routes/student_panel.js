const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'college'
});
const query_student_schedule = "SELECT  DISTINCT Course_Name, Room, Day, Start_Time, Finish_Time FROM class_schedule JOIN enrollment JOIN section WHERE Student_ID= 564 and Section_ID = Schedule_ID and Term='Fall' and Academic_year=2018;";


router.get('/', function(req, res) {

	connection.query(query_student_schedule, (error, results, fields) => {
		if (error) {
			throw error;
		}
		res.render('student_schedule', {

			results
		});
	});
});




module.exports = router;