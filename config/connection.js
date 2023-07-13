const { connect, connection } = require('mongoose');
// connection to the database
connect('mongodb://127.0.0.1:27017/friendster');

module.exports = connection;