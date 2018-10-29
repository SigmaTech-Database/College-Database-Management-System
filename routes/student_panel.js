const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'college'
});


const query_student_schedule = "SELECT c.Name, c.Day, c.Room, c.Start_Time, c.Finish_Time FROM student st JOIN enrollment e ON e.Student_ID = st.ID JOIN section s ON e.Section_ID = s.ID JOIN class_schedule c ON s.Schedule_ID = c.ID WHERE st.ID = 726 OR st.First_Name = 'Flo' AND e.Academic_year = '2018' and e.Term = 'Fall';";


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