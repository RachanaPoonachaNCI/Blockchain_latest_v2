var fs = require('fs');

function getAboutUs(callback) {
  fs.readFile('./database/about_us.json', 'utf8', function (err, data) {
    if (err) {
      return callback(err); // Pass the error to the callback
    }
    var obj = JSON.parse(data);
    callback(null, obj); // Pass null as the first argument to indicate no error
  });
}

module.exports = getAboutUs;