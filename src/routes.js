const { Router } = require("express");

const routes = new Router();

const projects = [];

const checkProjectExists = (req, res, next) => {
  const project = projects.find(({ id }) => id === req.params.id);

  if (!project) {
    res.json({ message: "Project doesn't exists" });
  }

  next();
};

const checkRequiredFields = (req, res, next) => {
  if (!req.body.id) {
    return res.json({ message: "Project Id is required" });
  }

  if (!req.body.title) {
    return res.json({ message: "Project Title is required" });
  }

  next();
};

routes.get("/projects", (req, res) => {
  res.json(projects);
});

routes.post("/projects", checkRequiredFields, (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title, tasks: [] });

  res.json(projects);
});

routes.get("/projects/:id", checkProjectExists, (req, res) => {
  const project = projects.find(({ id }) => id === req.params.id);

  res.json(project);
});

routes.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;

  const project = projects.find(({ id }) => id === req.params.id);
  project.title = title;

  res.json(project);
});

routes.delete("/projects/:id", checkProjectExists, (req, res) => {
  const projectIndex = projects.findIndex(({ id }) => id === req.params.id);

  projects.splice(projectIndex, 1);

  res.send();
});

routes.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { title } = req.body;

  const project = projects.find(({ id }) => id === req.params.id);

  project.tasks.push(title);

  res.json(project);
});

module.exports = routes;
