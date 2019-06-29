const { Category } = require('../models');

const addCategory = () => {};

const getCategoryName = () => {};

const getCategoryLink = () => {};

const getAllCategories = () => new Promise((resolve, reject) => {
  Category.find().exec((err, categories) => {
    if (err) return reject(err);
    resolve(categories);
  });
});

module.exports = {
  addCategory,
  getCategoryName,
  getCategoryLink,
  getAllCategories,
};
