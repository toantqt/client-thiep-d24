import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  addGift,
  addSystemVoucher,
  addVoucherStore,
} from "../../../../api/adminAPI";
import slug from "../../../../resources/slug";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function AddVoucherStore(props) {
  const history = useHistory();
  const [config, setConfig] = useState();
  const [point, setPoint] = useState();
  const [gift, setGift] = useState("");
  const [reload, setReload] = useState(false);
  const [title, setTitle] = useState("");
  const [promotion, setPromotion] = useState({
    discount: 0,
    percent: 0,
    max: 0,
  });
  const [condition, setCondition] = useState(0);

  useEffect(async () => {
    props.handleLoading(false);
  }, []);

  const handleSubmit = async () => {
    const data = {
      title: title,
      promotion: promotion,
      condition: condition,
    };
    await addVoucherStore(data).then((res) => {
      history.push(slug.voucherManager);
    });
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangePromotion = (event) => {
    const name = event.target.name;
    setPromotion({ ...promotion, [name]: event.target.value });
  };
  const handleChangeCondition = (event) => {
    setCondition(event.target.value);
  };

  return (
    <Grid>
      <div className="header-title">
        <span>Thêm voucher khách hàng mới: </span>
      </div>
      <hr />
      <Grid container spacing={2} className="mt-2">
        <Grid item lg={12} md={12} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Voucher
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Voucher"
            name="title"
            key={config?.money}
            defaultValue={config?.money}
            onChange={handleChangeTitle}
          />
        </Grid>
        {/* <Grid item lg={4} md={4} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Thời gian bắt đầu
          </span>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            style={{ marginBottom: "0px !important" }}
          >
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={startDay}
              // onChange={handleDateChange}
              onChange={(e) => {
                handleChangeDay(e, "start");
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Thời gian kết thúc
          </span>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            style={{ marginBottom: "0px !important" }}
          >
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={endDay}
              onChange={(e) => {
                handleChangeDay(e, "end");
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid> */}
        {/* <Grid item lg={4} md={4} xs={12}></Grid> */}
        <Grid item lg={4} md={4} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Giảm tiền
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Tiền"
            // disabled={true}
            name="discount"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handleChangePromotion}
            type="number"
          />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Phần trăm
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="%"
            // disabled={true}
            name="percent"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handleChangePromotion}
            type="number"
          />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Giá trị tối đa
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Tối đa"
            // disabled={true}
            name="max"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handleChangePromotion}
            type="number"
          />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Điều kiện (giá trị)
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Giá trị"
            // disabled={true}
            name="money"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handleChangeCondition}
            type="text"
          />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <div style={{ width: "100%", height: "60px" }}>
            <Button
              variant="contained"
              color="primary"
              // startIcon={<EditIcon />}
              style={{
                textTransform: "none",
                float: "right",
                marginBottom: "0px !important",
              }}
              className="mt-3"
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
