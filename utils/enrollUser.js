var fs = require('fs');

function addEnrollment(params, callback) {
  const filePath = './database/purchases.json';
  const metamask_address = params.metamask_address
  const enrollment_data = params.enrollment_data
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return callback(err); // Pass the error to the callback
    }

    try {
      var obj = JSON.parse(data);

      if(Object.keys(obj).includes(metamask_address)) {
        obj[metamask_address][enrollment_data.message] = enrollment_data;
      }else{
        obj[metamask_address] = {}
        obj[metamask_address][enrollment_data.message] = enrollment_data;
      }

      // Write the updated obj back to the file
      fs.writeFile(filePath, JSON.stringify(obj, null, 2),
        'utf8', function (writeErr) {
          if (writeErr) {
            return callback(writeErr); // Pass the write error to the callback
          }

          callback(null, true); 
        });
    } catch (parseErr) {
      callback(parseErr); // Pass the parse error to the callback
    }
  });
}

module.exports = addEnrollment;