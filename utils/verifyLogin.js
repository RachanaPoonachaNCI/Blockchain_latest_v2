var fs = require('fs');

function verifyLogin(metamask_address, callback) {
  fs.readFile('./database/user.json', 'utf8', function (err, data) {
    if (err) {
      return callback(err); // Pass the error to the callback
    }
    
    // var obj = JSON.parse(data);
    var obj = eval('(' + data + ')')
    var result = false;
    if(Object.keys(obj).includes(metamask_address)) {
      result = obj[metamask_address]
    }
    callback(null, result); 
  });
}

module.exports = verifyLogin;