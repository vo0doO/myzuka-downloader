const fs = require('fs');

module.exports.readFile = readFile;

async function readFile() {
    return new Promise(done => {
        fs.readFile('./links.txt', (err, data) => {
            if (err) {
                console.log(err.message);
            } else {
                return done(data.toString().split('\n'));
            }
        })
    });
}