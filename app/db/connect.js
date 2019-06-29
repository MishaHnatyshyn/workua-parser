const mongoose = require('mongoose');

const connect = ({
  user, password, host, port, dbname
}) => {
  mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/${dbname}`, { useNewUrlParser: true });
};

module.exports = connect;
