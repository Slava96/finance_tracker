import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { InlineDatePicker } from "material-ui-pickers";
import moment from "moment";
import { withSnackbar } from "notistack";

const styles = theme => ({
  form: {
    minWidth: 300,
    marginTop: 15
  },
  formControl: {
    marginBottom: 25
  }
});

class LeftMainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      types: [],
      form: {
        user: "",
        summ: "",
        date: moment(),
        radioVal: "income",
        type: "",
        comment: ""
      }
    };
  }

  async componentDidMount() {
    const userResponse = await fetch("/api/users");
    const bodyUsers = await userResponse.json();
    const typeResponse = await fetch("/api/types");
    const typeBody = await typeResponse.json();
    this.setState({ users: bodyUsers, types: typeBody });
  }

  handleChange = name => event => {
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
    const endIncome = radioVal === "income" ? true : false;
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
      });
    this.props.onPayAdd();

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
  };

  render() {
    const {
      users,
      types,
      form: { user, summ, date, radioVal, type, comment }
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <FormGroup className={classes.form}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="user_select">Пользователь</InputLabel>
            <Select
              value={user}
              onChange={this.handleChange("user")}
              inputProps={{
                id: "user_select"
              }}
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.formControl}
            type="number"
            label="Сумма"
            value={summ}
            onChange={this.handleChange("summ")}
            inputProps={{
              min: "0"
            }}
          />
          <InlineDatePicker
            className={classes.formControl}
            onlyCalendar
            keyboard
            label="Дата платежа"
            format="DD.MM.YYYY"
            value={date}
            onChange={this.handleDateChange}
            disableFuture
          />
          <FormControl>
            <FormLabel>Тип операции</FormLabel>
            <RadioGroup value={radioVal} onChange={this.handleRadioChange}>
              <FormControlLabel
                value="income"
                control={<Radio color="primary" />}
                label="Доходы"
              />
              <FormControlLabel
                value="outcome"
                control={<Radio color="primary" />}
                label="Расходы"
              />
            </RadioGroup>
            {radioVal === "outcome" ? (
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type_select">Тип расходов</InputLabel>
                <Select
                  value={type}
                  onChange={this.handleChange("type")}
                  inputProps={{
                    id: "type_select"
                  }}
                >
                  {types.map(type => (
                    <MenuItem key={type.id} value={type}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </FormControl>
          <TextField
            className={classes.formControl}
            value={comment}
            onChange={this.handleChange("comment")}
            label="Комментарий"
          />
          <Button color="primary" onClick={this.handleSubmit}>
            Добавить платеж
          </Button>
        </FormGroup>
      </>
    );
  }
}

LeftMainPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(LeftMainPanel));
