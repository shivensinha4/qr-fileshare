import React from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Snackbar from './Snackbar';

const style = {
  position: "fixed",
  bottom: "16px",
  right: "16px"
};

function UploadFileButton() {
  return (
      <div>
        <Button variant="fab" color="secondary" aria-label="add" style={style} onClick={onClick}>
          <Icon>add</Icon>
        </Button>
        <form action="#" id="fileUploadForm">
          <input type='file' id="fileHiddenInput" name="file" hidden onChange={() => fileInputChange()}/>
        </form>
        <Snackbar message="File Uploaded" identity="uploaded"/>
      </div>
  )
}

const onClick = () => {
  document.getElementById("fileHiddenInput").click();
};

const fileInputChange = () => {
  const form = document.getElementById('fileUploadForm');
  const formData = new FormData(form),
      queryOptions = {
        method: 'post',
        body: formData
      };

  fetch('/api/files', queryOptions)
      .then(response => {
        document.getElementById('uploadedSnackbarShowButton').click();
      });
};


export default UploadFileButton;
