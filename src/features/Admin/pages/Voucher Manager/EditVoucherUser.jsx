import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  addGift,
  addSystemVoucher,
  editVoucherUser,
  getDetailsVoucherUser,
} from "../../../../api/adminAPI";
import slug from "../../../../resources/slug";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import queryString from "query-string";

export default function EditVoucherUser(props) {
  const history = useHistory();
  const search = queryString.parse(props.location.search);
  const voucherID = search.id;
  const [config, setConfig] = useState();
  const [point, setPoint] = useState();
  const [gift, setGift] = useState("");
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

  const [voucher, setVoucher] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    if (voucherID) {
      await getDetailsVoucherUser(voucherID).then((res) => {
        setVoucher(res.data);
        setTitle(res.data.title);
        setCondition(res.data.condition);
        setPromotion(res.data.promotion);
        setDescription(res.data.description);
        setStartDay(new Date(res.data.startDay));
        setEndDay(new Date(res.data.endDay));
      });
      props.handleLoading(false);
    }
  }, [voucherID]);

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
      voucherID: voucherID,
      title: title,
      promotion: promotion,
      condition: condition,
      description: description,
      startDay: start.getTime(),
      endDay: start.getTime(),
    };
    props.handleLoading(true);
    await editVoucherUser(data).then((res) => {
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
        <span>C???p nh???t voucher kh??ch h??ng: </span>
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
            key={voucher?.title}
            defaultValue={voucher?.title}
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
            Th???i gian b???t ?????u
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
            Th???i gian k???t th??c
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
            Gi???m ti???n
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Ti???n"
            // disabled={true}
            name="discount"
            key={voucher?.promotion?.discount}
            defaultValue={voucher?.promotion?.discount}
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
            Ph???n tr??m
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="%"
            // disabled={true}
            name="percent"
            key={voucher?.promotion?.percent}
            defaultValue={voucher?.promotion?.percent}
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
            Gi?? tr??? t???i ??a
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="T???i ??a"
            // disabled={true}
            name="max"
            key={voucher?.promotion?.max}
            defaultValue={voucher?.promotion?.max}
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
            ??i???u ki???n (m?? t???)
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="M?? t???"
            // disabled={true}
            name="title"
            key={voucher?.condition?.title}
            defaultValue={voucher?.condition?.title}
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
            ??i???u ki???n (gi?? tr???)
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Gi?? tr???"
            // disabled={true}
            name="money"
            key={voucher?.condition?.money}
            defaultValue={voucher?.condition?.money}
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
            M?? t??? voucher
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="??u ????i"
            // disabled={true}
            name="endow"
            key={voucher?.description?.endow}
            defaultValue={voucher?.description?.endow}
            onChange={handelChangeDescription}
            type="text"
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            label="Hi???u l???c"
            // disabled={true}
            name="time"
            key={voucher?.description?.time}
            defaultValue={voucher?.description?.time}
            onChange={handelChangeDescription}
            type="text"
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            label="Thi???t b???"
            // disabled={true}
            name="os"
            key={voucher?.description?.os}
            defaultValue={voucher?.description?.os}
            onChange={handelChangeDescription}
            type="text"
          />

          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            label="S???n ph???m"
            // disabled={true}
            name="product"
            key={voucher?.description?.product}
            defaultValue={voucher?.description?.product}
            onChange={handelChangeDescription}
            type="text"
          />

          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            label="Thanh to??n"
            // disabled={true}
            name="payment"
            key={voucher?.description?.payment}
            defaultValue={voucher?.description?.payment}
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
              X??c nh???n
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
