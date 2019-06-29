const db = require('../db');

const main = (req, res) => {
  res.end();
};

const getSingleResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await db.resume.getSingleResume(id);
    if (!resume) return res.status(404).json({ status: 'ERROR', msg: 'Invalid resume id' });
    res.json({ resume, status: 'OK' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'ERROR', msg: 'Server error' });
  }
};

const getResumeList = async (req, res) => {
  try {
    const { page = 1, category } = req.query;
    const { resumes, pages } = await db.resume.getFilteredResumes({ page, category });
    res.json({ resumes, pages, status: 'OK' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'ERROR' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await db.category.getAllCategories();
    res.json({ categories, status: 'OK' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'ERROR', msg: 'Server error' });
  }
};


module.exports = {
  main,
  getSingleResume,
  getResumeList,
  getAllCategories,
};
