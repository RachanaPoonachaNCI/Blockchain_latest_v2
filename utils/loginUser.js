var fs = require('fs');

function login(metamask_address,callback) {
    const filePath = './database/user.json';

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return callback(err); // Pass the error to the callback
        }

        try {
            var obj = JSON.parse(data);

            // Update the obj with the new information
            obj[metamask_address] = true;

            // Write the updated obj back to the file
            fs.writeFile(filePath, JSON.stringify(obj, null, 2), 'utf8', function (writeErr) {
                if (writeErr) {
                    return callback(writeErr); // Pass the write error to the callback
                }

                callback(null, true); // Pass null as the first argument to indicate no error
            });
        } catch (parseErr) {
            callback(parseErr); // Pass the parse error to the callback
        }
    });
}

module.exports = login;