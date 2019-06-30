const { Category } = require('../models');

const addCategory = (name, originalName, link) => new Promise((resolve, reject) => {
  const newCategory = new Category({
    name,
    originalName,
    link,
  });

  newCategory.save((err) => {
    if (err) return reject(err);
    resolve(newCategory);
  });
});

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
