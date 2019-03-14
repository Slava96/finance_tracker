import React  from "react";
import { withStyles } from "@material-ui/core/styles";
import {Pie, PieChart, Tooltip} from 'recharts'

const styles = theme => ({
  root: {
    marginTop: 15
  }
});

const RightMainPanel = ({classes, chartData}) => {
  return (
    <div className={classes.root}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={chartData}
          innerRadius={75}
          outerRadius={100}
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default withStyles(styles)(RightMainPanel);
