const mongoose = require('mongoose');
const url = 'mongodb://0.0.0.0:27017';
const databaseName = 'Project'

class mongoConnection {
    // for connecting our local db we will call this function
    async dbConnect() {
    return mongoose.connect(`${url}/${databaseName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('database connected sucessfully');
    }, error => {
        console.log('error Database:' + error);
    });

}
}

module.exports = mongoConnection;