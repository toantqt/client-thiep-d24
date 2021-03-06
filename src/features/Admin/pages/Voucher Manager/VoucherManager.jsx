import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import TableComponent from "../../../../components/Table/Table.component";

import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ModalDelete from "../../../../components/Modal/ModalDelete";
import slug from "../../../../resources/slug";
import {
  getVoucherUser,
  getVoucherStore,
  deleteSystemVoucher,
  deleteVoucherStore,
} from "../../../../api/adminAPI";

export default function VoucherManager(props) {
  const history = useHistory();
  const [gift, setGift] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [url, setUrl] = useState("");
  const [selectID, setSelectID] = useState("");
  const [reload, setReload] = useState(false);
  const [voucherUser, setVoucherUser] = useState([]);
  const [voucherStore, setVoucherStore] = useState([]);
  const [type, setType] = useState("");

  useEffect(async () => {
    props.handleLoading(true);
    await getVoucherUser().then((res) => {
      setVoucherUser(res.data);
    });
    await getVoucherStore().then((res) => {
      setVoucherStore(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const handleClickDelete = (type, id) => {
    setSelectID(id);

    setOpenConfirm(true);
    setType(type);
  };
  const handleCloseConfirm = () => {
    setSelectID("");
    setType("");
    setOpenConfirm(false);
  };
  const rows1 = voucherUser.map((e, index) => {
    return {
      id: index,
      voucher: e.title,
      type: "user",
      action: e._id,
    };
  });

  const row2 = voucherStore.map((e, index) => {
    return {
      id: index,
      voucher: e.title,
      type: "store",
      action: e._id,
    };
  });

  const columns = [
    { field: "voucher", headerName: "Voucher", width: 400 },
    {
      field: "action",
      headerName: "Ch???c n??ng ",
      width: 150,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              variant="contained"
              style={{ color: "blue" }}
              onClick={() => {
                handleClickEdit(action.row.type, action.row.action);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              variant="contained"
              style={{ color: "red" }}
              onClick={() => {
                handleClickDelete(action.row.type, action.row.action);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const handleDeleteGift = async () => {
    const data = {
      voucherID: selectID,
    };
    if (type === "user") {
      await deleteSystemVoucher(data).then((res) => {
        handleCloseConfirm();
        setReload(!reload);
      });
    } else {
      await deleteVoucherStore(data).then((res) => {
        handleCloseConfirm();
        setReload(!reload);
      });
    }
  };

  const handleClickEdit = (type, id) => {
    if (type === "user") {
      history.push({ pathname: slug.editVoucherUser, search: `?id=${id}` });
    } else {
      history.push({ pathname: slug.editVoucherStore, search: `?id=${id}` });
    }
  };

  const handleClickAdd = (type) => {
    if (type === "user") {
      history.push(slug.addVoucherUser);
    } else if (type === "store") {
      history.push(slug.addVoucherStore);
    }
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Qu???n l?? voucher: </span>
      </div>
      <hr />

      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <div className="mt-3">
            <div className="header-title mb-3">
              <span>Voucher kh??ch h??ng: </span>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                style={{
                  textTransform: "none",
                  float: "right",
                }}
                onClick={() => handleClickAdd("user")}
              >
                Th??m m???i
              </Button>
            </div>
            <hr />
            <TableComponent rows={rows1} columns={columns} rowHeight={60} />
          </div>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <div className="mt-3">
            <div className="header-title mb-3">
              <span>Voucher ?????i l??: </span>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                style={{
                  textTransform: "none",
                  float: "right",
                }}
                onClick={() => handleClickAdd("store")}
              >
                Th??m m???i
              </Button>
            </div>
            <hr />
            <TableComponent rows={row2} columns={columns} rowHeight={60} />
          </div>
        </Grid>
      </Grid>

      <div>
        <ModalDelete
          open={openConfirm}
          handleClose={handleCloseConfirm}
          title="X??c nh???n x??a voucher"
          handleDelete={handleDeleteGift}
        />
      </div>
    </Grid>
  );
}
