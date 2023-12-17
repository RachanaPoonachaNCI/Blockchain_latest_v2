var fs = require('fs');

function getCourses(callback) {
    fs.readFile('./database/courses.json', 'utf8', function (err, data) {
        if (err) {
            return callback(err); // Pass the error to the callback
        }
        var obj = JSON.parse(data);
        callback(null, obj); // Pass null as the first argument to indicate no error
    });
}

module.exports = getCourses;