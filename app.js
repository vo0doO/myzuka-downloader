const openAlbum = require('./libs/2_openAlbum');
const readFile = require('./libs/1_readFileWithLinks');

async function start() {
    var links = await readFile.readFile();

    if (links.length == 0) {
        console.log('file is empty');

        return;
    }

    console.log(links);

    for (let i = 0; i < links.length; i++) {
        await openAlbum.openAlbum(links[i]);
    }
}

start()