const request = require('request');

const requestPromise = (uri, options) => new Promise(((resolve, reject) => {
  request(uri, options, (err, data) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    resolve(data.body);
  });
}));

module.exports = requestPromise;
