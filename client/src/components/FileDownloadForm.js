import React, {Component} from 'react';

class FileDownloadForm extends Component {
  constructor(props) {
    super(props);
    this.fileId = props.fileId;
  }

  componentWillUpdate(nextProps) {
    this.fileId = nextProps.fileId;
  }

  render() {
    let url = `https://localhost:8000/api/file/${this.fileId}`;

    return (
        <a href={url} download id="fileDownloadLink"/>
    )
  }
}

export default FileDownloadForm;