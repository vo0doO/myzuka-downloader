const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

const openSong = require('./3_openSong');
const downloadSong = require('./4_downloadSong');

module.exports.openAlbum = openAlbum;

function openAlbum(link) {
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

                try {
                    var artistName = $('a[itemprop="byArtist"]').attr('href').split('/').pop();
                    var albumName = $('span[itemprop="title"]').last().text();
                    var albumYear = $('tbody > tr:nth-child(3) > td:nth-child(2) > a').text();
    
                    albumName = albumName.replace(/:/g, '_');
    
                    var linksHtml = $('div.player-inline div.options div.top a:nth-child(3)');
                    var linksOnSong = [];
                    var linksOnFiles = [];
                } catch (e) {
                    console.log('Error, openAlbum(): ' + e);

                    return;
                }


                for (let i = 0; i < linksHtml.length; i++) {
                    linksOnSong.push('http://myzuka.me' + linksHtml[i].attribs.href);
                }

                for (let i = 0; i < linksOnSong.length; i++) {
                    linksOnFiles.push(await openSong.openSong(linksOnSong[i]));
                }

                for (let i = 0; i < linksOnFiles.length; i++) {
                    await downloadSong.downloadSong(linksOnFiles[i], artistName, albumName, albumYear);
                }

                return done(body);
            }
        });
    });
}