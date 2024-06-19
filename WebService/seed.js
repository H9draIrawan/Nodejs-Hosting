const { sequelize, User, Room, StudentRoom, Question, Score } = require("./db");
(async function () {
	await sequelize.drop({ force: true });
	await sequelize.sync({ force: true });
	await User.bulkCreate([
		{
			id: "U00000001",
			email: "anne@gmail.com",
			username: "anne",
			password: "anne",
			role: "Student",
		},
		{
			id: "U00000002",
			email: "beatrice@gmail.com",
			username: "beatrice",
			password: "beatrice",
			role: "Student",
		},
		{
			id: "U00000003",
			email: "clara@gmail.com",
			username: "clara",
			password: "clara",
			role: "Student",
		},
		{
			id: "U00000004",
			email: "diana@gmail.com",
			username: "diana",
			password: "diana",
			role: "Teacher",
		},
		{
			id: "U00000005",
			email: "ellaine@gmail.com",
			username: "ellaine",
			password: "ellaine",
			role: "Teacher",
		},
	]);

	await Room.bulkCreate([
		{
			id: "R00000001",
			id_teacher: "U00000004",
			name: "Count",
			status: true,
		},
		{
			id: "R00000002",
			id_teacher: "U00000005",
			name: "English",
			status: true,
		},
	]);

	await StudentRoom.bulkCreate([
		{
			id: "SR00000001",
			student_id: "U00000001",
			room_id: "R00000001",
		},
		{
			id: "SR00000002",
			student_id: "U00000002",
			room_id: "R00000001",
		},
		{
			id: "SR00000003",
			student_id: "U00000003",
			room_id: "R00000001",
		},
		{
			id: "SR00000004",
			student_id: "U00000001",
			room_id: "R00000002",
		},
		{
			id: "SR00000005",
			student_id: "U00000002",
			room_id: "R00000002",
		},
		{
			id: "SR00000006",
			student_id: "U00000003",
			room_id: "R00000002",
		},
	]);

	await Question.bulkCreate([
		{
			id: "Q00000001",
			id_room: "R00000001",
			status: true,
			question: "What is 2 + 2?,What is 3 + 3?,What is 4 + 4?,What is 5 + 5?",
			answer: "4,6,8,10",
		},
		{
			id: "Q00000002",
			id_room: "R00000002",
			status: true,
			question:
				"What is the capital of the Philippines?,What is the capital of Japan?,What is the capital of China?,What is the capital of South Korea?",
			answer: "Manila,Tokyo,Beijing,Seoul",
		},
	]);

	await Score.bulkCreate([
		{
			id: "SC00000001",
			id_student: "U00000001",
			id_question: "Q00000001",
			answer: "4,6,8,10",
			score: 10,
		},
		{
			id: "SC00000002",
			id_student: "U00000002",
			id_question: "Q00000001",
			answer: "4,6,8,10",
			score: 10,
		},
		{
			id: "SC00000003",
			id_student: "U00000003",
			id_question: "Q00000001",
			answer: "4,6,8,10",
			score: 0,
		},
	]);
})();
