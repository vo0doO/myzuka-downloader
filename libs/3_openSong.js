const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

module.exports.openSong = openSong;

async function openSong(link) {
    return new Promise(done => {
        var headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36 OPR/46.0.2597.57',
        }

        var options = {
            url: link,
            gzip: true,
            headers: headers,
            method: 'GET',
        }
        request(options, async (err, res, body) => {
            if (err) {
                console.log(err);

                console.log(err.message);
            } else {
                body = body.toString();
                var $ = cheerio.load(body);

                var name = link.split('/').pop();
                var linkOnFile = $('a[itemprop="audio"]').attr('href');

                return done({
                    Link: linkOnFile,
                    Name: name
                });
            }
        });
    });
}