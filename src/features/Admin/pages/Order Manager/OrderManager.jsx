import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";
export default function OrderManager(props) {
  useEffect(async () => {
    props.handleLoading(true);
  }, []);

  //   const rows = products.map((e, index) => {
  //     return {
  //       id: e.id,
  //       image: e.image,
  //       size: e.size,
  //       price: e.price,
  //     };
  //   });

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
        <span>Quản lý đơn đặt hàng</span>
      </div>

      <div className="mt-3">
        {/* <TableComponent rows={rows} columns={columns} rowHeight={200} /> */}
      </div>
    </Grid>
  );
}
