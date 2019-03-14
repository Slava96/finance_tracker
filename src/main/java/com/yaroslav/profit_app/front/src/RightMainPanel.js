import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TypeHistoryChart from "./TypeHistoryChart";
import ChartFilters from "./ChartFilters";

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
        <ChartFilters />
        <TypeHistoryChart />
      </div>
    );
  }
}
export default withStyles(styles)(RightMainPanel);
