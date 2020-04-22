#!/usr/bin/env node
// TODO: Implement Search Bar
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
const devEnv = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development';

// Clear Uploads
const directory = 'uploads';
fs.readdir(directory, (err, files) => {
  // Skipping error because it simply means that the directory is not created yet. It will be fixed automatically later.
  if (!err) {
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  }
});

app.locals.files = [];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const createServer = address => {
  let options = [0, address];
  if (devEnv) options = [8000]

  let server = app.listen(...options, async () => {
    const serverAcquiredAddress = `http://${server.address().address}:${server.address().port}`;
    console.log(serverAcquiredAddress);
    displayQrCode(serverAcquiredAddress);
    !devEnv && opn(serverAcquiredAddress);
    app.locals.fileCount = 0; // Store the number of files, useful for generating new ids
    await storage.init();
    await storage.clear();
    configureApp();
    configureSocketServer(server);
  });
};

getInterfaceAddress().then(address => {
  createServer(address);
});

const displayQrCode = address => {
  const qr_image = qr.imageSync(address, {parse_url: true, size: 1, margin: 3, ec_level: 'H'}),
      qr_svg = qr.image(address, { type: 'svg' });

  qr_svg.pipe(require('fs').createWriteStream('generated_qr.svg'));

  pngStringify(qr_image, (err, pngStr) => {
    if (err) throw err;
    console.log(pngStr);
  });
}

const configureApp = () => {
  route(app);
}

const configureSocketServer = server => {
  app.locals.io = require('socket.io').listen(server);
}

// Serve from React's build
app.use("/", express.static(path.join(__dirname, 'client', 'build')));

exports.storage = storage;
