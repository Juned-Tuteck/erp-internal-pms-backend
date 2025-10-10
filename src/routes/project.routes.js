const express = require('express');
const projectModule = require('../modules/project.module');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await projectModule.getAllProjects();
  res.status(result.statusCode).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await projectModule.getProjectById(id);
  res.status(result.statusCode).json(result);
});

router.post('/', async (req, res) => {
  const result = await projectModule.createProject(req.body);
  res.status(result.statusCode).json(result);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await projectModule.updateProject(id, req.body);
  res.status(result.statusCode).json(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await projectModule.deleteProject(id);
  res.status(result.statusCode).json(result);
});

router.delete('/:id/hard', async (req, res) => {
  const { id } = req.params;
  const result = await projectModule.hardDeleteProject(id);
  res.status(result.statusCode).json(result);
});

module.exports = router;
