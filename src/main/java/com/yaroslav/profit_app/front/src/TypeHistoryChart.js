import React, { Component } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import results from "./data/results.json";

import callApi from './callApi'

const COLORS = ["#4d79ff", "#009933", "#b38f00", "#ff1a1a"];

class TypeHistoryChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      chartData: results
    };
  }

  async componentDidMount() {
    const typeBody = await callApi("/api/types");
    this.setState({
      types: typeBody
    });
    // this.toChartData();
  }

  async toChartData() {
    const { types } = this.state;
    const resultData = [];
    for (const [index, type] of types.entries()) {
      let records = await callApi(`/api/records/${type.id}`);
      records = Array.from(records);
      let summ = 0;
      records.map((record, i) => {
        summ += record.summ;
        return null;
      });
      resultData.push({
        name: type.name,
        value: summ,
        fill: COLORS[index % 4]
      });
    }

    this.setState({
      chartData: resultData
    });
  }

  render() {
    const { chartData } = this.state;
    return (
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
    );
  }
}

export default TypeHistoryChart;
