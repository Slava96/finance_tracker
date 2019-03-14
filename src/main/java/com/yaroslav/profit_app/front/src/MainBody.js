import React, { Component } from "react";
import LeftMainPanel from "./LeftMainPanel";
import RightMainPanel from "./RightMainPanel";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
    this.handlePayAdd = this.handlePayAdd.bind(this);
  }

  handlePayAdd = event => {
    this.setState({
      update: true
    });
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <LeftMainPanel onPayAdd={this.handlePayAdd} />
          <RightMainPanel update={this.state.update} />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}
export default MainBody;
