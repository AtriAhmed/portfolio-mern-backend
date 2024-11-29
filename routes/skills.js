const express = require("express");

const route = express.Router();

const { getSkillsByTypes, getSkills, getSkillById, addSkill, updateSkill, deleteSkill } = require("../controllers/skillsContoller");

route.get("/get-types-with-skills", getSkillsByTypes);

route.get("/get-all-skills", getSkills);

route.get("/get-skill/:id", getSkillById);

route.post("/add-skill", addSkill);

route.put("/update-skill/:id", updateSkill);

route.delete("/delete-skill/:id", deleteSkill);

module.exports = route;
