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
import { deleteGift, getAllGift } from "../../../../api/adminAPI";
import slug from "../../../../resources/slug";

export default function GiftManager(props) {
  const history = useHistory();
  const [gift, setGift] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [url, setUrl] = useState("");
  const [selectID, setSelectID] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(async () => {
    props.handleLoading(true);
    await getAllGift().then((res) => {
      setGift(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  console.log(gift);

  const handleClickViewImage = (image) => {
    setOpen(true);
    setUrl(image);
  };

  const handleClose = () => {
    setOpen(false);
    setUrl("");
  };

  const handleClickDelete = (id) => {
    setSelectID(id);
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setSelectID("");
    setOpenConfirm(false);
  };
  const rows = gift.map((e, index) => {
    return {
      id: index,
      gift: e.gift,
      point: e.point,
      action: e._id,
    };
  });

  const columns = [
    { field: "gift", headerName: "Qùa tặng", width: 400 },
    { field: "point", headerName: "Điểm", width: 140 },
    {
      field: "action",
      headerName: "Chức năng ",
      width: 200,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              variant="contained"
              style={{ color: "blue" }}
              onClick={() => {
                handleClickEdit(action.row.action);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              variant="contained"
              style={{ color: "red" }}
              onClick={() => {
                handleClickDelete(action.row.action);
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
    await deleteGift(selectID).then((res) => {
      handleCloseConfirm();
      setReload(true);
    });
  };

  const handleClickEdit = (id) => {
    history.push({ pathname: slug.editGift, search: `?id=${id}` });
  };

  const handleClickAdd = () => {
    history.push(slug.addGift);
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Quản lý quà tặng: </span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClickAdd}
        >
          Thêm quà tặng mới
        </Button>
      </div>
      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} rowHeight={60} />
      </div>

      <div>
        <ModalDelete
          open={openConfirm}
          handleClose={handleCloseConfirm}
          title="Xác nhận xóa banner"
          handleDelete={handleDeleteGift}
        />
      </div>
    </Grid>
  );
}
