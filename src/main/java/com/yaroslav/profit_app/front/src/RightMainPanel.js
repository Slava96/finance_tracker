import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TypeHistoryChart from "./TypeHistoryChart";

const styles = theme => ({
  root: {
    marginTop: 15
  }
});

class RightMainPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TypeHistoryChart />
      </div>
    );
  }
}
export default withStyles(styles)(RightMainPanel);
