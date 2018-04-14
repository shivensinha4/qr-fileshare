const upload  = require('multer')();
const path = require('path');

module.exports = (app) => {
  // Get list of all files
  app.get('/api/files/', (req, res) => {
    res.json(app.locals.files);
  });

  // Upload
  app.post('/api/files/', upload.single("file"), (req, res) => {
    try{
      app.locals.files.push({...req.file, id: app.locals.files.length});
      res.json(app.locals.files.slice(-1)[0]);
      app.locals.io.emit('file list update', JSON.stringify(app.locals.files));
    } catch(e){
      res.send(e);
    }
  });

  // Delete
  app.delete('/api/file/:fileId', (req, res) => {
    const fileIdToDelete = parseInt(req.params.fileId);
    for (let i = 0; i < app.locals.files.length; i++){
      const currentFile = app.locals.files[i];
      if(currentFile.id === fileIdToDelete){
        app.locals.files.splice(i, 1);
        break;
      }
    }
    app.locals.io.emit('file list update', JSON.stringify(app.locals.files));
    res.sendStatus(204);
  });
};