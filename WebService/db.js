const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("playgo", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

class User extends Model {}
User.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			unique: true,
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			unique: true,
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, underscored: true, timestamps: false }
);

class Room extends Model {}
Room.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.STRING,
			allowNull: false,
		},
		id_teacher: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
	}
);

class StudentRoom extends Model {}
StudentRoom.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.STRING,
			allowNull: false,
		},
		student_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		room_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
	}
);

class Question extends Model {}
Question.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.STRING,
			allowNull: false,
		},
		id_room: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		question: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		answer: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
	}
);

class Score extends Model {}
Score.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.STRING,
			allowNull: false,
		},
		id_student: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		id_question: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		answer: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		score: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
	}
);

User.hasMany(StudentRoom, { foreignKey: "student_id" });
StudentRoom.belongsTo(User, { foreignKey: "student_id" });
Room.hasMany(StudentRoom, { foreignKey: "room_id" });
StudentRoom.belongsTo(Room, { foreignKey: "room_id" });

Room.hasMany(Question, { foreignKey: "id_room" });
Question.belongsTo(Room, { foreignKey: "id_room" });

Question.hasMany(Score, { foreignKey: "id_question" });
Score.belongsTo(Question, { foreignKey: "id_question" });

module.exports = { sequelize, User, Room, StudentRoom, Question, Score };
