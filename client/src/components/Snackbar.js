import React from 'react';
import SnackbarMaterial from 'material-ui/Snackbar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

class Snackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.message = props.message;
    this.identity = props.identity;
  }

  handleClick = () => {
    this.setState({open: true});
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  };

  render() {
    return (
        <div>
          <button onClick={this.handleClick} style={{display: "none"}} id={`${this.identity}SnackbarShowButton`}/>
          <SnackbarMaterial
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={this.state.open}
              autoHideDuration={3000}
              onClose={this.handleClose}
              SnackbarContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.props.message}</span>}
              action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleClose}
                >
                  <Icon style={{fontSize: "16px", lineHeight: "100%"}}>close</Icon>
                </IconButton>
              ]}
          />
        </div>
    );
  }
}

export default Snackbar;