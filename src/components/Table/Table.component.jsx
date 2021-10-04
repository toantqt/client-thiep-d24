import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TablePagination from "@material-ui/core/TablePagination";
import "./table.css";
export default function TableComponent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    props.handleChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ height: "600px", width: "100%" }}>
      {props.count ? (
        <>
          {" "}
          <DataGrid
            rows={props?.rows}
            columns={props?.columns}
            disableColumnMenu={true}
            rowHeight={props?.rowHeight}
          />
          <TablePagination
            component="div"
            count={props?.count}
            page={props?.page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </>
      ) : (
        <DataGrid
          rows={props?.rows}
          columns={props?.columns}
          rowHeight={props?.rowHeight}
          pageSize={20}
          className="table"
        />
      )}
    </div>
  );
}
