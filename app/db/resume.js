const { Resume } = require('../models');

const addNewResume = () => {};

const getResumesByCategory = () => {};

const getFilteredResumes = ({ page = 1, category }) => new Promise(((resolve, reject) => {
  Resume.paginate({ category }, { limit: 9, page })
    .then((result) => {
      resolve({ resumes: result.docs, pages: result.totalPages });
    })
    .catch(reject);
}));

const getSingleResume = id => new Promise(((resolve, reject) => {
  Resume.findById(id).exec((err, resume) => {
    if (err) return reject(err);
    resolve(resume);
  });
}));

module.exports = {
  addNewResume,
  getResumesByCategory,
  getFilteredResumes,
  getSingleResume,
};
