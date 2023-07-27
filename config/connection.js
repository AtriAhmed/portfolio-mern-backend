const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

const conn = process.env.ATLAS_URI;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const ExperienceSchema = new mongoose.Schema({
    name: String,
    position: String,
    date: String,
    description: String
});

const SkillSchema = new mongoose.Schema({
    type: String,
    name: String,
    level: String,
});

const TypeSchema = new mongoose.Schema({
    name: String,
});

const WorkSchema = new mongoose.Schema({
    name: String,
    description: String,
    technologies: String,
    image: String,
    link: String,
    showInCV: Boolean
});

const AboutSchema = new mongoose.Schema({
    title: String,
    content: String
});

const ContactSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    title: String,
    email: String,
    phone: String,
    location: String
});


const User = connection.model('User', UserSchema);

const Experience = connection.model('Experience', ExperienceSchema, "experience");

const Skill = connection.model('Skill', SkillSchema);

const Type = connection.model('Type', TypeSchema);

const Work = connection.model('Work', WorkSchema, "work");

const About = connection.model('About', AboutSchema, "about");

const Contact = connection.model('Contact', ContactSchema, "contact");

// Expose the connection
module.exports = connection;