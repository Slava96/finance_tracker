import React, { Component } from "react";
import LeftMainPanel from "./LeftMainPanel";
import RightMainPanel from "./RightMainPanel";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

import moment from "moment";
import results from "./data/results.json";
import types from "./data/types.json";
import users from "./data/users.json";

import callApi from './callApi'

const COLORS = ["#4d79ff", "#009933", "#b38f00", "#ff1a1a"];

class MainBody extends Component {
  state = {
    // left
    users: users,
    types: types,
    form: {
      user: "",
      summ: "",
      date: moment(),
      radioVal: "income",
      type: "",
      comment: ""
    },
    // right
    // types: [],
    chartData: results,
  };

  async componentDidMount() {
    // right
    // const typeBody = await callApi("/api/types");
    // this.setState({
    //   types: typeBody
    // });
    // this.toChartData();
    //
    // left
    // const bodyUsers = await callApi("/api/users");
    // const typeBody = await callApi("/api/types");
    // this.setState({ users: bodyUsers, types: typeBody });
  }

  makeHandleChange = name => event => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: event.target.value
      }
    });
  };

  handleRadioChange = event => {
    const type = (event.target.value==="income"? "":this.state.form.type);
    this.setState({
      form: {
        ...this.state.form,
        radioVal : event.target.value,
        type : type
      }
    });
  };

  handleDateChange = date => {
    this.setState({
      form: {
        ...this.state.form,
        date
      }
    });
  };

  handleSubmit = e => {
    const {
      form: { user, summ, date, radioVal, type, comment }
    } = this.state;
    const endSumm = Number.isNaN(parseFloat(summ)) ? 0 : parseFloat(summ);
    const endIncome = radioVal === "income";
    e.preventDefault();
    fetch("/api/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summ: endSumm.toFixed(2),
        isIncome: endIncome,
        comment: comment,
        user: user,
        type: type === "" ? null : type,
        date: date.format("DD.MM.YYYY")
      })
    })
      .then(response => {
        if (response.ok) {
          this.props.enqueueSnackbar("Платеж успешно сохранен", {
            variant: "success"
          });
        } else {
          throw new Error("Платеж не сохранен!");
        }
      })
      .catch(err => {
        console.log("Error ", err);
        this.props.enqueueSnackbar("Платеж не сохранен", {
          variant: "error"
        });
      })
      .then(() => {
        this.setState({
          form: {
            user: "",
            summ: "",
            date: moment(),
            radioVal: "income",
            type: "",
            comment: ""
          }
        });
      })
      .then(async () => {
        const typeBody = await callApi("/api/types");
        this.setState({
          types: typeBody
        });
        this.toChartData();
      })
  };


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
    const rightPanelProps = {chartData}

    const {
      users,
      types,
      form: { user, summ, date, radioVal, type, comment }
    } = this.state;
    const { classes } = this.props;

    const leftPanelProps = {
      classes: classes,
      users: users,
      types: types,
      user: user,
      summ: summ,
      date: date,
      radioVal: radioVal,
      type: type,
      comment: comment,
      onDateChange: this.handleDateChange,
      onRadioChange: this.handleRadioChange,
      onSubmit: this.handleSubmit,
      makeOnChange: this.makeHandleChange,
    }

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <LeftMainPanel {...leftPanelProps} />
          <RightMainPanel {...rightPanelProps} />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}
export default MainBody;
