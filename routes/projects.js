const express = require("express");
const router = express.Router();
const { projects, ROLE } = require("../role");
const { authUser } = require("../auth");
const {
  canViewProject,
  scopedProjects,
  canDeleteProject,
} = require("../permissions/project");

router.get("/", (req, res) => {
  res.json(scopedProjects(req.user, projects));
});

router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
  console.log(req.params.projectId);
  res.json(req.project);
});

router.delete(
  "/:projectId",
  setProject,
  authUser,
  authDeleteProject,
  (req, res) => {
    res.send("Deleted Project");
  }
);

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    res.status(404);
    return res.send("Project not found");
  }
  next();
}

function authGetProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed for project");
  }

  next();
}

function authDeleteProject(req, res, next) {
  if (!canDeleteProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed to delete for project");
  }

  next();
}

module.exports = router;
