import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import slug from "../../../../resources/slug";
import TableComponent from "../../../../components/Table/Table.component";
import queryString from "query-string";
import { deleteCard, getProduct } from "../../../../api/adminAPI";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import ModalDelete from "../../../../components/Modal/ModalDelete";
import TextField from "@material-ui/core/TextField";

export default function ProductManager(props) {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const search = queryString.parse(props.query);
  const product = search.product;
  const [productID, setProductID] = useState("");
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [searchs, setSearch] = useState("");

  useEffect(async () => {
    props.handleLoading(true);
    await getProduct(product).then((res) => {
      console.log(res);
      setProducts(res.data);
      props.handleLoading(false);
    });
  }, [product, reload]);

  const handleClickDelete = (id) => {
    setProductID(id);
    setOpen(true);
  };
  const handleCloseDelete = () => {
    setProductID("");
    setOpen(false);
  };

  const handleDelete = async () => {
    const data = {
      cardID: productID,
    };
    props.handleLoading(true);
    await deleteCard(data).then((res) => {
      handleCloseDelete();
      setReload(!reload);
    });
  };

  const handleClickEdit = (id) => {
    history.push({
      pathname: slug.editCard,
      search: `?id=${id}`,
    });
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const rows = products
    .filter((data) => {
      if (searchs === "") {
        return data;
      } else {
        return data.id.search(searchs.toUpperCase()) !== -1;
      }
    })
    .map((e, index) => {
      console.log(e);
      return {
        id: e.id,
        image: e.image,
        size: e.size,
        price: e.price,
        action: e,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 160 },
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
    { field: "size", headerName: "Kích thước", width: 160 },
    { field: "price", headerName: "Giá tiền", width: 160 },
    {
      field: "action",
      headerName: "Chức năng",
      width: 250,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-3"
              onClick={() => {
                handleClickDelete(action.row?.action?._id);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Grid>
      <div className="header-title">
        <span>{product}</span>
      </div>
      <div style={{ width: "40%" }} className="mt-3">
        <TextField
          id="outlined-basic"
          variant="outlined"
          style={{ width: "100%" }}
          label="Tìm kiếm"
          onChange={handleChangeSearch}
        />
      </div>

      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} rowHeight={200} />
      </div>
      <ModalDelete
        open={open}
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
        title="Xác nhận xóa thiệp"
      />
    </Grid>
  );
}
