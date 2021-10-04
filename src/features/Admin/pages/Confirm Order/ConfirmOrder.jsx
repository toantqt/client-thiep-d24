import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";
import { getAllOrder } from "../../../../api/adminAPI";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ModalEditOrder from "../../../../components/Modal/ModalEditOrder";
import Chip from "@material-ui/core/Chip";

import "../Order Manager/order.css";

export default function ConfirmOrder(props) {
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getAllOrder(false).then((res) => {
      console.log(res.data);
      setOrder(res.data);
      props.handleLoading(false);
    });
  }, [reload]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (data) => {
    setData(data.row.action);
    setOpen(true);
  };

  const handleReload = () => {
    handleClose();
    setReload(!reload);
  };

  const rows = order
    .filter((order) => {
      return !order.order.confirm;
    })
    .map((e, index) => {
      return {
        id: index,
        name: e.order.contact?.name,
        phoneNumber: e.order.contact?.phoneNumber,
        image: e.card.image,
        price: e.order.amount,
        shareCode: e.order.shareCode,
        voucher: e.order.voucher?.title,
        status: e.order.confirm,
        action: e,
      };
    });

  const columns = [
    { field: "name", headerName: "Khách hàng", width: 200 },
    { field: "phoneNumber", headerName: "Điện thoại", width: 140 },
    { field: "price", headerName: "Tạm tính", width: 115 },
    { field: "shareCode", headerName: "Code", width: 100 },
    { field: "voucher", headerName: "Voucher", width: 200 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 130,
      renderCell: (action) => {
        if (action.row.action.confirm) {
          return (
            <Chip
              label="Đã xác nhận"
              clickable
              color="primary"
              variant="outlined"
            />
          );
        } else {
          return (
            <Chip label="Chờ xác nhận" color="secondary" variant="outlined" />
          );
        }
      },
    },
    {
      field: "action",
      headerName: "Chức năng ",
      width: 130,
      renderCell: (action) => {
        return (
          <IconButton
            variant="contained"
            style={{ color: "blue" }}
            onClick={() => {
              handleClick(action);
            }}
          >
            <EditIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Grid>
      <div className="header-title">
        <span>Đơn đặt hàng đang chờ xác nhận: ({rows.length})</span>
      </div>

      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} rowHeight={60} />
      </div>
      <ModalEditOrder
        open={open}
        handleClose={handleClose}
        data={data}
        handleReload={handleReload}
      />
    </Grid>
  );
}
