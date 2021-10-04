import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));
export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    history.push("/admin");
  };

  return (
    <div className="wrap-header" style={{ float: "right" }}>
      <div>
        <List dense className={classes.root}>
          <ListItem button onClick={handleClick}>
            <ListItemText primary="Admin" />
          </ListItem>
        </List>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
