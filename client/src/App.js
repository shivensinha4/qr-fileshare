import React, {Component} from 'react';
import TopBar from './components/TopBar';
import UploadFileButton from './components/UploadFileButton';
import FileList from './components/FileList';
import FileDownloadForm from './components/FileDownloadForm';
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import io from 'socket.io-client';
import Snackbar from './components/Snackbar';
import FileDropZone from './components/FileDropZone';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      updateToggle: false,
      files: [],
      fetchingFiles: true,
      downloadFileId: null
    }
  }

  componentDidMount() {
    // Connect to socket and update file list on server data change
    this.socket = io.connect('/');
    this.socket.on('file list update', (files) => {
      files = JSON.parse(files);
      this.setState({files});
    });

    // Initial data fetch
    getFileList().then(files => {
      this.setState({
        files,
        fetchingFiles: false
      });
    });
  }

  setDownloadFileId(downloadFileId, callback){
    this.setState({downloadFileId}, callback);
    this.setState({});
  }

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <FileDropZone/>
          <TopBar/>
          <FileList files={this.state.files} fetchingFiles={this.state.fetchingFiles} setDownloadFileId={this.setDownloadFileId.bind(this)}/>
          <UploadFileButton/>
          <Snackbar message="File Deleted" identity="deleted"/>
          <FileDownloadForm fileId={this.state.downloadFileId}/>
        </MuiThemeProvider>
    );
  }
}

const getFileList = () => {
  return fetch('/api/files/')
      .then(response => response.json());
};

export default App;
