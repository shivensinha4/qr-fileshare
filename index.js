const opn = require('opn');
const express = require('express');
const app = express();
const qr = require('qr-image');
const pngStringify = require('console-png');
const getInterfaceAddress = require('./server/getInterfaceAddress');
const route = require('./server/routes');
const storage = require('node-persist');
const fs = require('fs');
const path = require('path');

// Clear Uploads
const directory = 'uploads';
fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});

app.locals.files = [];

// Serve from React's build
app.use("/", express.static(__dirname + '/client/build/'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const createServer = (address) => {
  // app.listen(8000, address,
  let server = app.listen(8000, () => {
    const address = `http://${server.address().address}:${server.address().port}`;
    console.log(address);
    displayQrCode(address);
    app.locals.fileCount = 0; // Store the number of files, useful for generating new ids
    storage.init();
    storage.clear();
    configureApp();
    configureSocketServer(server);
  });
};

getInterfaceAddress().then((address) => {
  createServer(address);
});

const displayQrCode = (address) => {
  const qr_image = qr.imageSync(address, {parse_url: true, size: 1, margin: 3, ec_level: 'H'});
  pngStringify(qr_image, (err, pngStr) => {
    if (err) throw err;
    console.log(pngStr);
  });
};

const configureApp = () => {
  route(app);
};

const configureSocketServer = (server) => {
  const io = require('socket.io').listen(server);
  app.locals.io = io;
};

exports.storage = storage;