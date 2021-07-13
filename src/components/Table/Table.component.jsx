import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function TableComponent(props) {
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <DataGrid
        rows={props?.rows}
        columns={props?.columns}
        pageSize={20}
        disableColumnMenu={true}
        rowHeight={props?.rowHeight}
      />
    </div>
  );
}
