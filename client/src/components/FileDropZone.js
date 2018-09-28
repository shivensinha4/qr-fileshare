import React, {Component} from 'react';

class FileDropZone extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
    this.style = {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100%',
      visibility: 'visible',
      zIndex: -1
    }
  }

  onDrop = (e) => {
    e.preventDefault();
    document.getElementById("fileHiddenInput").files = e.dataTransfer.files;
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  render() {
    return (
        <div
            style={this.style}
            onDrop={this.onDrop}
            onDragOver={this.onDragOver}
        />
    )
  }
}

export default FileDropZone;