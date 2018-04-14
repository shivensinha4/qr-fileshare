import React, {Component} from 'react';
import TopBar from './components/TopBar';
import UploadFileButton from './components/UploadFIleButton';
import FileList from './components/FileList';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import io from 'socket.io-client';
import Snackbar from './components/Snackbar';

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

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <TopBar/>
          <FileList files={this.state.files} fetchingFiles={this.state.fetchingFiles}/>
          <UploadFileButton/>
          <Snackbar message="File Deleted" identity="deleted"/>
        </MuiThemeProvider>
    );
  }
}

const getFileList = () => {
  return fetch('/api/files/')
      .then(response => response.json());
};

export default App;
