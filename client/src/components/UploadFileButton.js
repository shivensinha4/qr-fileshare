import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Snackbar from './Snackbar';
import {CircularProgress} from 'material-ui/Progress';

const style = {
  position: "fixed",
  bottom: "16px",
  right: "16px"
};

class UploadFileButton extends Component {
  constructor() {
    super();
    this.state = {
      uploadingFiles: []
    }
  }

  fileInputChange = () => {
    // Store that one file (more) is uploading
    let uploadingFiles = this.state.uploadingFiles;
    uploadingFiles.push(true);
    this.setState({uploadingFiles});

    const form = document.getElementById('fileUploadForm');
    const formData = new FormData(form),
        queryOptions = {
          method: 'post',
          body: formData
        };

    fetch('/api/files', queryOptions)
        .then(response => {
          document.getElementById('uploadedSnackbarShowButton').click();
          // Clear input value
          document.getElementById("fileHiddenInput").value = "";
          // Remove from list of uploading files
          let uploadingFiles = this.state.uploadingFiles;
          uploadingFiles.splice(0, 1);
          this.setState({uploadingFiles});
        });
  };

  render() {
    return (
        <div>
          <Button variant="fab" color="secondary" aria-label="add" style={style} onClick={onClick}>
            {this.state.uploadingFiles.length !== 0 ?
                <CircularProgress
                    variant="indeterminate"
                    style={{color: "#FFF"}}
                    size={30}
                    thickness={5}
                /> :
                <Icon>add</Icon>
            }
          </Button>
          <form action="#" id="fileUploadForm">
            <input type='file' id="fileHiddenInput" name="file" hidden multiple onChange={this.fileInputChange}/>
          </form>
          <Snackbar message="File Uploaded" identity="uploaded"/>
        </div>
    )
  }
}

const onClick = () => {
  document.getElementById("fileHiddenInput").click();
};


export default UploadFileButton;
