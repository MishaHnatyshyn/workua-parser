const express = require('express');
const Controllers = require('../controllers');

const router = express.Router();

router.get('/', Controllers.main);

router.get('/api/resume/:id', Controllers.getSingleResume);

router.get('/api/resumes', Controllers.getResumeList);

router.get('/api/categories', Controllers.getAllCategories);

module.exports = router;
