import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import slug from "../../../../resources/slug";
import TableComponent from "../../../../components/Table/Table.component";
import queryString from "query-string";
import { deleteCard, getCountPage, getProduct } from "../../../../api/adminAPI";
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
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();

  useEffect(async () => {
    props.handleLoading(true);
    await getCountPage(product).then((res) => {
      setCount(res.data);
    });
    await getProduct(product, page).then((res) => {
      console.log(res.data);
      setProducts(res.data);
      props.handleLoading(false);
    });
  }, [product, reload, page]);

  useEffect(() => {
    setPage(0);
  }, [product]);

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
      headerName: "H??nh ???nh",
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
    { field: "size", headerName: "K??ch th?????c", width: 160 },
    { field: "price", headerName: "Gi?? ti???n", width: 160 },
    {
      field: "action",
      headerName: "Ch???c n??ng",
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

  const handleChangePage = (page) => {
    setPage(page);
  };
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
          label="T??m ki???m"
          onChange={handleChangeSearch}
        />
      </div>

      <div className="mt-3">
        <TableComponent
          rows={rows}
          columns={columns}
          rowHeight={200}
          count={count}
          page={page}
          handleChangePage={handleChangePage}
        />
      </div>
      <ModalDelete
        open={open}
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
        title="X??c nh???n x??a thi???p"
      />
    </Grid>
  );
}
