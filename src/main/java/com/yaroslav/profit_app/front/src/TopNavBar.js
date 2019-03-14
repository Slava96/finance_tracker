import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

const TopNavBar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Finance Tracker
          </Typography>
          <Button color="inherit" href="https://github.com">Github</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopNavBar.propTypes = {
  classes : PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNavBar);
