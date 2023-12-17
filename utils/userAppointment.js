var fs = require('fs');

function addAppointment(params, callback) {
    const filePath = './database/appointments.json';
    const metamask_address = params.metamask_address
    const appointment_data = params.appointment_data
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return callback(err); // Pass the error to the callback
        }

        try {
            var obj = JSON.parse(data);

            if(Object.keys(obj).includes(metamask_address)){
                obj[metamask_address].push(appointment_data);
            }else{
                obj[metamask_address] = [appointment_data];
            }

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

module.exports = addAppointment;