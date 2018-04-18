const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  }
});
const upload = multer({storage});

module.exports = (app) => {
  const storage = require('../index').storage;

  // Get list of all files
  app.get('/api/files/', (req, res) => {
    getFileArrayFromStorage(storage)
        .then(files => res.json(files))
        .catch(err => res.send(err));
  });

  // Download file
  app.get('/api/file/:fileId', (req, res) => {
    storage.get(req.params.fileId)
        .then(fileObject => {
          const options = {
            headers: {
              'Content-type': fileObject.mimetype
            }
          };
          res.download(fileObject.path, fileObject.originalname, options);
        })
  });

  // Upload
  app.post('/api/files/', upload.single("file"), (req, res) => {
    try {
      storage.setItem(app.locals.fileCount.toString(), {...req.file, id: app.locals.fileCount});
      app.locals.fileCount++;

      getFileArrayFromStorage(storage)
          .then(files => {
            app.locals.io.emit('file list update', JSON.stringify(files));
          })
          .catch(err => res.send(err));

      res.sendStatus(201);
    } catch (e) {
      res.send(e);
    }
  });

  // Delete
  app.delete('/api/file/:fileId', (req, res) => {
    storage.removeItem(req.params.fileId);
    getFileArrayFromStorage(storage).then(files => {
      app.locals.io.emit('file list update', JSON.stringify(files));
      res.sendStatus(204);
    })
  });
};

const isPreviewableImage = (file) => {
  const validSize = file.size < (2 * 1024 * 1024); // < 2MB
  const validMimeType = file.mimetype.split("/")[0] === "image";
  return validSize && validMimeType;
};

const getFileArrayFromStorage = (storage) => {
  return storage.values()
      .then(filesObject => {
        return Object.values(filesObject).map(file => {
          const sendData = isPreviewableImage(file);
          if (sendData) {
            const buffer = fs.readFileSync(file.path);
            file.buffer = buffer;
          }

          return file;
        })
      });
};