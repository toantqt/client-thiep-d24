import React, { useState, useEffect } from "react";
import { getAllUser } from "../../../../api/adminAPI";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import TableComponent from "../../../../components/Table/Table.component";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import BlockIcon from "@material-ui/icons/Block";
import IconButton from "@material-ui/core/IconButton";
import ModalApprove from "../../../../components/Modal/ModalApprove";
import ModalUnApprove from "../../../../components/Modal/ModalUnApprove";
import "../../../../assets/style/style.css";
export default function UserManager(props) {
  const [user, setUser] = useState([]);
  const [openApprove, setOpenApprove] = useState(false);
  const [dataApprove, setDataApprove] = useState();
  const [openUnApprove, setOpenUnApprove] = useState(false);
  const [reload, setReload] = useState(false);

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  useEffect(async () => {
    props.handleLoading(true);

    await getAllUser().then((res) => {
      setUser(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const rows = user
    .sort((a, b) => {
      return new Date(b.news.created) - new Date(a.news.created);
    })
    .map((e, index) => {
      return {
        id: index,
        fullName: e.user.fullName,
        phoneNumber: e.user.phoneNumber,
        address: e.user.address,
        code: e.code.shareCode,
        approved: e.user.approved,
        created: formatDate(e.createdAt),
        action: e.user,
      };
    });

  const columns = [
    { field: "fullName", headerName: "Tên", width: 160 },
    { field: "phoneNumber", headerName: "Điện thoại", width: 160 },
    { field: "address", headerName: "Địa chỉ", width: 160 },
    { field: "code", headerName: "Code", width: 160 },
    { field: "created", headerName: "Ngày tạo", width: 160 },
    {
      field: "approved",
      headerName: "Duyệt",
      width: 130,
      renderCell: (approved) => {
        if (approved.row.approved) {
          return (
            <Chip
              label="Đã duyệt"
              clickable
              color="primary"
              variant="outlined"
            />
          );
        } else {
          return (
            <Chip label="Chờ duyệt" color="secondary" variant="outlined" />
          );
        }
      },
    },
    {
      field: "action",
      headerName: "Chức năng",
      width: 135,
      renderCell: (action) => {
        if (action.row.action.approved) {
          return (
            <IconButton
              variant="contained"
              style={{ color: "red" }}
              onClick={() => {
                handleClickModalUnApprove(action.row.action);
              }}
            >
              <BlockIcon />
            </IconButton>
          );
        } else {
          return (
            <IconButton
              style={{ color: "green" }}
              onClick={() => {
                handleClickModalApprove(action.row.action);
              }}
            >
              <CheckBoxIcon />
            </IconButton>
          );
        }
      },
    },
  ];

  const handleClickModalApprove = (data) => {
    setDataApprove(data);
    setOpenApprove(true);
  };
  const handleClickModalUnApprove = (data) => {
    setDataApprove(data);
    setOpenUnApprove(true);
  };

  const handleCloseApprove = () => {
    setOpenApprove(false);
    setDataApprove();
  };
  const handleCloseUnApprove = () => {
    setOpenUnApprove(false);
    setDataApprove();
  };

  const handleReload = () => {
    setOpenApprove(false);
    setOpenUnApprove(false);

    setReload(!reload);
  };
  return (
    <Grid>
      <div className="header-title">
        <span>Quản lý đại lý: (Tổng số - {user.length})</span>
      </div>
      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} />
      </div>
      <ModalApprove
        open={openApprove}
        handleClose={handleCloseApprove}
        data={dataApprove}
        handleReload={handleReload}
      />
      <ModalUnApprove
        open={openUnApprove}
        handleClose={handleCloseUnApprove}
        data={dataApprove}
        handleReload={handleReload}
      />
    </Grid>
  );
}
