const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
var http = require('http');

module.exports.downloadSong = downloadSong;

async function downloadSong(link, artistName, albumName, albumYear) {
    console.log('Current song: ' + artistName + '/' + albumYear + ' - ' + albumName + '/' + link.Name);
    return new Promise(done => {
        var headers = {
            //'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            //'Accept-Encoding': 'gzip, deflate',
            //'Accept-Language': 'en-GB,en;q=0.8,en-US;q=0.6,ru;q=0.4,uk;q=0.2',
            //'Connection': 'keep-alive',
            //'Cookie': '__cfduid=d4f142dd4520fa07804c9d6baeaaf04a21501652194; ASP.NET_SessionId=rywwyiq44m05duw5jgotongx; TVZavr=1',
            //'Host': 'myzuka.me',
            //'Referer': 'http://myzuka.me/Song/628258/Amenra-Change-Is-Always',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
        }

        var options = {
            url: 'http://myzuka.me' + link.Link,
            //gzip: true,
            headers: headers,
            method: 'GET',
        }

        request(options, async(err, res, body) => {
            if (err) {
                console.log(err);

                console.log(err.message);
            } else {
                var fileLink = res.request.uri.href;
                //console.log(fileLink);

                var foldertoDownloads = 'Z:/Muzik/zDownloads/';
                if (!fs.existsSync(foldertoDownloads)) {
                    fs.mkdirSync(foldertoDownloads);
                }

                foldertoDownloads = 'Z:/Muzik/zDownloads/' + artistName;
                if (!fs.existsSync(foldertoDownloads)) {
                    fs.mkdirSync(foldertoDownloads);
                }

                foldertoDownloads = 'Z:/Muzik/zDownloads/' + artistName + '/' + albumYear + ' - ' + albumName;
                if (!fs.existsSync(foldertoDownloads)) {
                    fs.mkdirSync(foldertoDownloads);
                }


                download(fileLink, foldertoDownloads + '/' + link.Name + '.mp3', () => {
                    return done();
                });
            }
        });
    });
}

var download = function (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);
        });
    });
}