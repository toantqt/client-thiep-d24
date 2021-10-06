import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addGift, addSystemVoucher } from "../../../../api/adminAPI";
import slug from "../../../../resources/slug";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function AddVoucherUser(props) {
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
  const [condition, setCondition] = useState({
    money: 0,
    title: "",
  });

  const [description, setDescription] = useState({
    endow: "",
    time: "",
    os: "",
    product: "",
    payment: "",
  });
  const [startDay, setStartDay] = React.useState(new Date());
  const [endDay, setEndDay] = React.useState(new Date());
  useEffect(async () => {
    props.handleLoading(false);
  }, []);

  const handleChangeConfig = (event) => {
    if (event.target.name === "gift") {
      setGift(event.target.value);
    } else {
      setPoint(event.target.value);
    }
  };

  console.log(point);

  const handleSubmit = async () => {
    let start = new Date(startDay);
    let end = new Date(endDay);
    const data = {
      title: title,
      promotion: promotion,
      condition: condition,
      description: description,
      startDay: start.getTime(),
      endDay: start.getTime(),
    };
    await addSystemVoucher(data).then((res) => {
      history.push(slug.voucherManager);
    });
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDay = (event, status) => {
    if (status === "start") {
      setStartDay(event);
    } else {
      setEndDay(event);
    }
    console.log(event);
  };
  const handleChangePromotion = (event) => {
    const name = event.target.name;
    setPromotion({ ...promotion, [name]: event.target.value });
  };
  const handleChangeCondition = (event) => {
    const name = event.target.name;
    setCondition({ ...condition, [name]: event.target.value });
  };
  const handelChangeDescription = (event) => {
    const name = event.target.name;
    setDescription({ ...description, [name]: event.target.value });
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
        <Grid item lg={4} md={4} xs={12}>
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
        </Grid>
        <Grid item lg={4} md={4} xs={12}></Grid>
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
            name="money"
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
        <Grid item lg={8} md={8} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Điều kiện (mô tả)
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Mô tả"
            // disabled={true}
            name="title"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handleChangeCondition}
            type="text"
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
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Mô tả voucher
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Ưu đãi"
            // disabled={true}
            name="endow"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handelChangeDescription}
            type="text"
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            label="Hiệu lực"
            // disabled={true}
            name="time"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handelChangeDescription}
            type="text"
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            label="Thiết bị"
            // disabled={true}
            name="os"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handelChangeDescription}
            type="text"
          />

          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            label="Sản phẩm"
            // disabled={true}
            name="product"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handelChangeDescription}
            type="text"
          />

          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            label="Thanh toán"
            // disabled={true}
            name="payment"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handelChangeDescription}
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
