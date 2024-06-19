const express = require("express");
const { User, Room, StudentRoom, Question, Score } = require("./db");
const { Op } = require("sequelize");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/users/login", async (req, res) => {
	const users = await User.findAll();
	const user = users.find(
		(user) =>
			(user.username == req.query.user || user.email == req.query.user) &&
			user.password == req.query.password
	);
	if (!user)
		return res.status(401).send({
			msg: "Login failed",
		});
	return res.status(200).send({
		msg: "Login success",
		user: user,
	});
});

app.post("/users/register", async (req, res) => {
	const { email, username } = req.body;
	const user = await User.findOne({
		where: {
			[Op.or]: [{ email: email }, { username: username }],
		},
	});
	if (user) return res.status(400).send({ msg: "User already exists" });
	await User.create(req.body);
	return res.status(201).send({ msg: "User created", user: req.body });
});

app.post("/rooms/create", async (req, res) => {
	const { id, id_teacher, name, status } = req.body;
	await Room.create({
		id: id,
		id_teacher: id_teacher,
		name: name,
		status: status,
	});
	return res.status(201).send({ msg: "Room created", room: req.body });
});

app.delete("/rooms/delete", async (req, res) => {
	const room = await Room.findOne({
		where: {
			id: req.query.id,
		},
	});
	if (!room) return res.status(404).send({ msg: "Room not found" });
	await room.destroy();
	return res.status(200).send({ msg: "Room deleted" });
});

app.get("/rooms/all", async (req, res) => {
	const rooms = await Room.findAll();
	return res.status(200).send(rooms);
});

app.get("/rooms/teacher", async (req, res) => {
	const rooms = await Room.findAll({
		where: {
			id_teacher: req.query.id_teacher,
		},
	});
	return res.status(200).send(rooms);
});

app.get("/rooms/name", async (req, res) => {
	const rooms = await Room.findAll({
		where: {
			name: req.query.name,
		},
	});
	return res.status(200).send(rooms);
});

app.post("/rooms/join", async (req, res) => {
	const { id_student, id_room } = req.body;
	const studentRoom = await StudentRoom.findOne({
		where: {
			id_student: id_student,
			id_room: id_room,
		},
	});
	if (studentRoom)
		return res.status(400).send({ msg: "Student already joined room" });
	await StudentRoom.create(req.body);
	return res
		.status(201)
		.send({ msg: "Student joined room", studentRoom: req.body });
});

app.delete("/rooms/leave", async (req, res) => {
	const studentRoom = await StudentRoom.findOne({
		where: {
			id_student: req.query.id_student,
			id_room: req.query.id_room,
		},
	});
	if (!studentRoom)
		return res.status(404).send({ msg: "Student not found in room" });
	await studentRoom.destroy();
	return res.status(200).send({ msg: "Student left room" });
});

app.get("/rooms/students", async (req, res) => {
	const studentRooms = await StudentRoom.findAll({
		where: {
			id_room: req.query.id_room,
		},
	});
	return res.status(200).send(studentRooms);
});

app.post("/rooms/close", async (req, res) => {
	const { id } = req.body;
	const room = await Room.findOne({
		where: {
			id: id,
		},
	});
	if (!room) return res.status(404).send({ msg: "Room not found" });
	room.status = false;
	await room.save();
	return res.status(200).send({ msg: "Room updated", room: room });
});

app.post("/questions/create", async (req, res) => {
	const { id, id_room, question, answer } = req.body;
	await Question.create({
		id: id,
		id_room: id_room,
		question: question,
		answer: answer,
	});
	return res.status(201).send({ msg: "Question created", question: req.body });
});

app.delete("/questions/delete", async (req, res) => {
	await Question.destroy({
		where: {
			id: req.query.id,
		},
	});
	return res.status(200).send({ msg: "Question deleted" });
});

app.get("/questions/room", async (req, res) => {
	const questions = await Question.findAll({
		where: {
			id_room: req.query.id_room,
		},
	});
	return res.status(200).send(questions);
});

app.get("/questions/number", async (req, res) => {
	const question = await Question.findOne({
		where: {
			id: req.query.id,
		},
	});
	if (!question) return res.status(404).send({ msg: "Question not found" });
	return res.status(200).send(question);
});

app.post("/scores/create", async (req, res) => {
	const { id, id_student, answer, score } = req.body;
	await Score.create({
		id: id,
		id_student: id_student,
		answer: answer,
		score: score,
	});
	return res.status(201).send({ msg: "Score created", score: req.body });
});

app.update("/scores/update", async (req, res) => {
	const score = await Score.findOne({
		where: {
			id: req.query.id_student,
		},
	});
	if (!score) return res.status(404).send({ msg: "Score not found" });
	score.score = req.query.score;
	await score.save();
	return res.status(200).send({ msg: "Score updated", score: score });
});

app.get("/scores/student", async (req, res) => {
	const scores = await Score.findOne({
		where: {
			id_student: req.query.id_student,
		},
	});
	return res.status(200).send(scores);
});

app.get("/scores/question", async (req, res) => {
	const scores = await Score.findAll({
		where: {
			id_question: req.query.id_question,
		},
	});
	return res.status(200).send(scores);
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
