import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import slug from "../../../../resources/slug";
import Divider from "@material-ui/core/Divider";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import StoreIcon from "@material-ui/icons/Store";
import PersonIcon from "@material-ui/icons/Person";
import CategoryIcon from "@material-ui/icons/Category";
import "./sidebar.css";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import SettingsIcon from "@material-ui/icons/Settings";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: "0px !important",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
export default function SideBar(props) {
  const history = useHistory();
  const classes = useStyles();

  const [param, setParam] = React.useState("overview");
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(true);

  const handleClickSlug = (param, url) => {
    setParam(param);
    history.push(url);
  };

  const handleClickSlugProduct = (param, url) => {
    setParam(param);
    history.push({
      pathname: slug.productManager,
      search: `?product=${param}`,
    });
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const arr = [
    "Thiệp cưới",
    "Sinh nhật",
    "Thiệp mời",
    "Giáng sinh",
    "Tình nhân",
    "Q.Tế Phụ Nữ",
    "Thầy Cô",
    "Năm mới",
    "Sổ kí tên",
    "Bao lì xì",
    "Bao thư",
    "Name Card",
    "Menu",
    "Thiệp mời công ty",
    "Thiệp chúc công ty",
    "Popup sinh nhật",
    "Popup giáng sinh",
  ];

  const lits = arr.map((e, index) => {
    return (
      <ListItem
        button
        className={classes.nested + (param == e ? " active" : "")}
        onClick={() => handleClickSlugProduct(e, slug.productManager)}
      >
        <ListItemIcon>
          <LoyaltyIcon />
        </ListItemIcon>
        <ListItemText primary={e} />
      </ListItem>
    );
  });
  return (
    // <div>
    //   <div className="header-logo">
    //     <img src={logo} alt="" width="100%" />
    //   </div>
    <List style={{ padding: "0px !important" }}>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Tài khoản" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested + (param == true ? " active" : "")}
            onClick={() => handleClickSlug(true, slug.userManager)}
          >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Đại lý" />
          </ListItem>

          <ListItem
            button
            className={classes.nested + (param == false ? " active" : "")}
            onClick={() => handleClickSlug(false, slug.approveUser)}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Khách hàng" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick1}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Sản phẩm" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {lits}
        </List>
      </Collapse>
      <ListItem button onClick={handleClick2}>
        <ListItemIcon>
          <LocalGroceryStoreIcon />
        </ListItemIcon>
        <ListItemText primary="Đặt hàng" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={
              classes.nested + (param == "orderManager" ? " active" : "")
            }
            onClick={() => handleClickSlug("orderManager", slug.orderManager)}
          >
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Đã xác nhận" />
          </ListItem>
          <ListItem
            button
            className={
              classes.nested + (param == "confrimOrder" ? " active" : "")
            }
            onClick={() => handleClickSlug("confrimOrder", slug.confrimOrder)}
          >
            <ListItemIcon>
              <HourglassEmptyIcon />
            </ListItemIcon>
            <ListItemText primary="Chờ xác nhận" />
          </ListItem>
        </List>
      </Collapse>
      <Divider />
      <ListItem
        button
        onClick={() => handleClickSlug("voucherManager", slug.voucherManager)}
        className={param == "voucherManager" ? " active" : ""}
      >
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Voucher" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlug("giftManager", slug.giftManager)}
        className={param == "giftManager" ? " active" : ""}
      >
        <ListItemIcon>
          <CardGiftcardIcon />
        </ListItemIcon>
        <ListItemText primary="Quà tặng" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlug("configManager", slug.configManager)}
        className={param == "configManager" ? " active" : ""}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Cấu hình" />
      </ListItem>
    </List>
    // </div>
  );
}
