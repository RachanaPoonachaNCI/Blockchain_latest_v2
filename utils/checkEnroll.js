var fs = require('fs');

function checkEnrollment(params, callback) {
  const metamask_address = params.metamask_address
  const course_id = params.course_id
  fs.readFile('./database/purchases.json', 'utf8', function (err, data) {
    if (err) {
      return callback(err); // Pass the error to the callback
    }
    var obj = JSON.parse(data);
    var result = false;
    if(Object.keys(obj).includes(metamask_address)) {
      result = Object.keys(obj[metamask_address]).includes(course_id);
    }
    callback(null, result); 
  });
}

module.exports = checkEnrollment;