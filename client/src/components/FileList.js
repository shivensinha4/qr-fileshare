import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import FileCard from './FileCard';
import '../styles/FileList.css';
import blue from "material-ui/colors/blue";

class FileList extends Component {
  constructor(props) {
    super(props);
    this.files = props.files;
    this.fetchingFiles = props.fetchingFiles;
    this.setDownloadFileId = props.setDownloadFileId;
  }

  componentWillReceiveProps(nextProps) {
    this.files = nextProps.files;
    this.fetchingFiles = nextProps.fetchingFiles;
  }

  render() {
    let html;

    if (this.fetchingFiles) {
      html =
          <Paper elevation={4} className="fileListPaper">
            <Typography color="textSecondary">
              Loading...
            </Typography>
          </Paper>;
      return html;
    }

    const fileCards = this.files.map((file) =>
        <Grid item key={file.id} className="fileListGridItem" xs={12} md={6}>
          <FileCard file={file} setDownloadFileId={this.setDownloadFileId}/>
        </Grid>
    );

    if (fileCards.length) {
      html =
          <div>
            <div id="fileListTopBackground" style={{background: blue.main}}/>
            <Grid id="fileListGrid" container justify="flex-start" spacing={8} alignItems="center">
              {fileCards}
            </Grid>
          </div>;
    } else {
      html =
          <Paper elevation={4} className="fileListPaper">
            <Typography>
              You have no files uploaded yet. Start by uploading one.
            </Typography>
          </Paper>;
    }

    return html;
  }
}

export default FileList;