import React from 'react';
import '../styles/TopBar.css';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';
import Modal from 'material-ui/Modal';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

  handleOpen = () => {
    this.setState({modalIsOpen: true});
  };

  handleClose = () => {
    this.setState({modalIsOpen: false});
  };

  render() {
    return (
        <div id="topBar" style={{background: blue.main}}>
          <Typography id="topBarHead" variant="display2">
            Transfer Files
          </Typography>
          <Typography id="topBarQrLink" onClick={this.handleOpen}>
            Display QR Code
          </Typography>
          <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.modalIsOpen}
              onClose={this.handleClose}
          >
            <div>
              <img id="qrCode" src='/generated_qr.svg' alt="QR Code"/>
            </div>
          </Modal>
        </div>
    )
  }
}

export default App;
