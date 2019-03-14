import React, { Component } from "react";
import LeftMainPanel from "./LeftMainPanel";
import RightMainPanel from "./RightMainPanel";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

class MainBody extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <LeftMainPanel />
          <RightMainPanel />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}
export default MainBody;
