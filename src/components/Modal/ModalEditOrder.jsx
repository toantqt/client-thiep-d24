import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { updateOrder } from "../../api/adminAPI";
import { DataGrid } from "@material-ui/data-grid";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ModalEditOrder(props) {
  console.log(props);
  const [checked, setChecked] = useState();
  const [quantity, setQuantity] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (props.data?.order) {
      setChecked(props.data?.order?.confirm);
      setQuantity(props.data?.order?.quantity);
      setAmount(props.data?.order?.amount);
    }
  }, [props.data]);
  const handleChangeConfirm = () => {
    setChecked(!checked);
  };
  const handleSumbit = async () => {
    const data = {
      orderID: props.data?.order?._id,
      confirm: checked,
    };
    if (data.confirm === props?.data?.order?.confirm) {
      props.handleClose();
    } else {
      await updateOrder(data).then((res) => {
        props.handleReload();
      });
    }
    // const data = {
    //   orderID: props.data?.order?._id,
    //   confirm: checked,
    //   quantity: quantity,
    //   amount: amount,
    // };
    // console.log(data);
    // if (
    //   data.quantity === props.data?.order?.quantity &&
    //   data.amount === props.data?.order?.amount &&
    //   data.confirm === props.data?.order?.confirm
    // ) {
    //   props.handleClose();
    // } else if (data.quantity && data.amount) {
    //   await updateOrder(data).then((res) => {
    //     props.handleReload();
    //   });
    // } else {
    //   alert("Dữ liệu không được để trống");
    // }
  };

  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    if (name === "quantity") {
      setQuantity(value);
    } else {
      setAmount(value);
    }
  };

  const rows = props?.data?.card?.map((e, index) => {
    return {
      id: e.cardID,
      image: e.image,
      quantity: e.quantity,
      amount: e.amount,
    };
  });
  console.log("row", rows);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 300,
      renderCell: (image) => {
        return (
          <div
            style={{
              width: "90%",
              margin: "0 auto",
            }}
          >
            <img src={image.row.image} alt="" width="50%" />
          </div>
        );
      },
    },
    { field: "quantity", headerName: "Số lượng", width: 180 },
    { field: "amount", headerName: "Tổng tiền", width: 200 },

    // {
    //   field: "action",
    //   headerName: "Chức năng ",
    //   width: 130,
    //   renderCell: (action) => {
    //     return (
    //       <IconButton
    //         variant="contained"
    //         style={{ color: "blue" }}
    //         onClick={() => {
    //           handleClick(action);
    //         }}
    //       >
    //         <EditIcon />
    //       </IconButton>
    //     );
    //   },
    // },
  ];
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={props.handleClose}
        open={props.open}
      >
        <DialogTitle onClose={props.handleClose}>
          Cập nhật đơn đặt hàng
        </DialogTitle>
        <DialogContent dividers>
          <h5>Chi tiết đơn đặt hàng: </h5>
          <Grid container spacing={1} className="mt-3">
            <Grid item lg={6} md={6} xs={12} className="details-order">
              <div>
                <span>Khách hàng: {props.data?.order?.contact.name}</span>
              </div>
              <div>
                <span>
                  Điện thoại: {props.data?.order?.contact.phoneNumber}
                </span>
              </div>
            </Grid>
            <Grid item lg={6} md={6} xs={12} className="details-order">
              <div>
                <span>Mã chia sẻ: {props.data?.order?.shareCode}</span>
              </div>
              <div>
                <span>Voucher: {props.data?.order?.voucher.title}</span>
              </div>
            </Grid>
            <Grid item lg={12} md={12} xs={12} className="mt-3">
              <div style={{ height: "300px", width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableColumnMenu={true}
                  rowHeight="130"
                />
              </div>
              <div className="mt-2" style={{ float: "right" }}>
                <span
                  style={{
                    lineHeight: 2,
                    fontSize: "18px",
                    color: "red",
                    fontWeight: "500",
                  }}
                  className="mr-2"
                >
                  Tổng tiền:{" "}
                </span>
                <TextField
                  defaultValue={props.data?.order?.amount}
                  onChange={handleChangeInput}
                  name="amount"
                />
              </div>
            </Grid>

            <div>
              <span
                style={{
                  lineHeight: 2,
                  fontSize: "18px",
                  color: "blue",
                  fontWeight: "500",
                }}
              >
                Tình trạng đơn:
              </span>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="gilad"
                      checked={checked}
                      onChange={handleChangeConfirm}
                    />
                  }
                  label="Đã xác nhận"
                />
              </div>
            </div>
            <Grid item xs={6}>
              <img src={props.data?.card?.image} alt="" width="100%" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={handleSumbit}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
