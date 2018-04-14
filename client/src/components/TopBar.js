import React from 'react';
import '../styles/TopBar.css';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';

function TopBar() {
  return (
    <div id="topBar" style={{background: blue.main}}>
      <Typography id="topBarHead" variant="display2" color="inherit">
        Transfer Files
      </Typography>
    </div>
  )
}

export default TopBar;
