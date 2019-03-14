import React from "react";
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

const LeftMainPanel = ({
  users,
  types,
  user,
  summ,
  date,
  radioVal,
  type,
  comment,
  classes,
  onDateChange,
  onRadioChange,
  onSubmit,
  makeOnChange,
}) => {
  return (
    <FormGroup className={classes.form}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="user_select">Пользователь</InputLabel>
        <Select
          value={user}
          onChange={makeOnChange("user")}
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
        onChange={makeOnChange("summ")}
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
        onChange={onDateChange}
        disableFuture
      />
      <FormControl>
        <FormLabel>Тип операции</FormLabel>
        <RadioGroup value={radioVal} onChange={onRadioChange}>
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
              onChange={makeOnChange("type")}
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
        onChange={makeOnChange("comment")}
        label="Комментарий"
      />
      <Button color="primary" onClick={onSubmit}>
        Добавить платеж
      </Button>
    </FormGroup>
  );
}

LeftMainPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(LeftMainPanel));
