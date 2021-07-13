import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";
import queryString from "query-string";
import { getProduct } from "../../../../api/adminAPI";
export default function ProductManager(props) {
  const [products, setProducts] = useState([]);
  const search = queryString.parse(props.query);
  const product = search.product;

  useEffect(async () => {
    props.handleLoading(true);
    await getProduct(product).then((res) => {
      console.log(res);
      setProducts(res.data);
      props.handleLoading(false);
    });
  }, [product]);

  const rows = products.map((e, index) => {
    return {
      id: e.id,
      image: e.image,
      size: e.size,
      price: e.price,
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 160 },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 200,
      renderCell: (image) => {
        return (
          <div
            style={{
              width: "95%",
              margin: "0 auto",
              height: "200px",
              backgroundImage: `url(${image.row.image})`,
              backgroundSize: "cover",
            }}
          ></div>
        );
      },
    },
    { field: "size", headerName: "Kích thước", width: 160 },
    { field: "price", headerName: "Giá tiền", width: 160 },

    // {
    //   field: "action",
    //   headerName: "Chức năng",
    //   width: 135,
    //   renderCell: (action) => {
    //     if (action.row.action.approved) {
    //       return (
    //         <IconButton
    //           variant="contained"
    //           style={{ color: "red" }}
    //           onClick={() => {
    //             handleClickModalUnApprove(action.row.action);
    //           }}
    //         >
    //           <BlockIcon />
    //         </IconButton>
    //       );
    //     } else {
    //       return (
    //         <IconButton
    //           style={{ color: "green" }}
    //           onClick={() => {
    //             handleClickModalApprove(action.row.action);
    //           }}
    //         >
    //           <CheckBoxIcon />
    //         </IconButton>
    //       );
    //     }
    //   },
    // },
  ];

  return (
    <Grid>
      <div className="header-title">
        <span>{product}</span>
      </div>

      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} rowHeight={200} />
      </div>
    </Grid>
  );
}
