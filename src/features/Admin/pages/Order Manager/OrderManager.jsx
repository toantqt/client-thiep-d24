import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";
import { getAllOrder } from "../../../../api/adminAPI";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ModalEditOrder from "../../../../components/Modal/ModalEditOrder";
import "./order.css";

export default function OrderManager(props) {
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getAllOrder().then((res) => {
      console.log(res.data);
      setOrder(res.data);
      props.handleLoading(false);
    });
  }, [reload]);

  const handleClose = () => {
    setData();
    setOpen(false);
  };

  const handleClick = (data) => {
    setData(data.row.action);
    setOpen(true);
  };

  const handleReload = () => {
    setData();
    setOpen(false);
    setReload(!reload);
  };

  const rows = order.map((e, index) => {
    return {
      id: index,
      name: e.order.contact?.name,
      phoneNumber: e.order.contact?.phoneNumber,
      image: e.card.image,
      quantity: e.order.quantity,
      price: e.order.amount,
      shareCode: e.order.shareCode,
      voucher: e.order.voucher?.title,
      action: e,
    };
  });

  const columns = [
    { field: "name", headerName: "Khách hàng", width: 160 },
    { field: "phoneNumber", headerName: "Điện thoại", width: 160 },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 130,
      renderCell: (image) => {
        return (
          <div
            style={{
              width: "60%",
              height: "120px",
              backgroundImage: `url(${image.row.image})`,
              backgroundSize: "cover",
            }}
          ></div>
        );
      },
    },
    { field: "quantity", headerName: "SL", width: 80 },
    { field: "price", headerName: "Tạm tính", width: 140 },
    { field: "shareCode", headerName: "Code", width: 100 },
    { field: "voucher", headerName: "Voucher", width: 160 },

    {
      field: "action",
      headerName: " ",
      width: 100,
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
        <span>Quản lý đơn đặt hàng</span>
      </div>

      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} rowHeight={130} />
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
