import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { getDetailsCard, updateCard } from "../../../../api/adminAPI";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImagePreivews from "../../../../components/Image Previews/ImagePreviews";
import slug from "../../../../resources/slug";
import CategorySelect from "../../../../components/Select/CategorySelect";
export default function EditProduct(props) {
  const history = useHistory();
  const search = queryString.parse(props.location.search);
  const cardID = search.id;
  const [imagePreview, setImagePreview] = useState();
  const [card, setCard] = useState();
  const [id, setID] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [item, setItem] = useState([]);
  const [itemAdd, setItemAdd] = useState({ name: "", price: "" });
  const [defaultItem, setDefaultItem] = useState({ name: "", price: "" });
  const [defaultSelect, setDefaultSelect] = useState();
  const [type, setType] = useState();

  useEffect(async () => {
    props.handleLoading(true);
    if (cardID) {
      await getDetailsCard(cardID).then((res) => {
        setCard(res.data);
        setImagePreview({ url: res.data.image });
        setID(res.data.id);
        setSize(res.data.size);
        setQuantity(res.data.quantity);
        setPrice(res.data.price);
        setItem(res.data.item);
        setType(res.data.type);
        setDefaultSelect(res.data.type);
      });
      props.handleLoading(false);
    }
  }, [cardID]);

  const handleChangeItemInLists = (event, index) => {
    const name = event.target.name;
    const value = event.target.value;
    let newItem = {
      ...item[index],
      [name]: value,
    };
    item[index] = newItem;
    setItem(item);
  };
  const listsItem = item?.map((e, index) => {
    return (
      <>
        <Grid item lg={4} md={4} xs={8} key={index}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Tên"
            key={e.name}
            defaultValue={e.name}
            name="name"
            onChange={(e) => {
              handleChangeItemInLists(e, index);
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} xs={2}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Giá tiền"
            type="number"
            key={e.price}
            defaultValue={e.price}
            name="price"
            onChange={(e) => {
              handleChangeItemInLists(e, index);
            }}
          />
        </Grid>
        <div>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            // startIcon={<EditIcon />}
            style={{
              textTransform: "none",
              float: "right",
              marginBottom: "0px !important",
            }}
            className="mt-3"
            onClick={() => {
              handleClickDeleteItem(e);
            }}
          >
            Xóa
          </Button>
        </div>
      </>
    );
  });

  const handleChangeImage = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        console.log(reader.result);
        reader.onloadend = () => {
          setImagePreview({ url: reader.result, file: file });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleChangeItem = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setItemAdd({ ...itemAdd, [name]: value });
  };

  const handleClickAddItem = () => {
    if (itemAdd.name === "") {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      setItem((item) => [...item, itemAdd]);
      setItemAdd({ name: "", price: "" });
      document.getElementById("item-name").value = "";
      document.getElementById("item-price").value = "";
    }
  };

  const handleClickDeleteItem = (data) => {
    const newArr = item.filter((e) => {
      return e.name !== data.name && e.price !== data.price;
    });
    setItem(newArr);
  };

  const handleChangeValue = (event, status) => {
    switch (status) {
      case 1:
        setID(event.target.value);
        break;
      case 2:
        setPrice(event.target.value);
        break;
      case 3:
        setSize(event.target.value);
        break;
      case 4:
        setQuantity(event.target.value);
        break;
    }
  };

  const handleChangeType = (value) => {
    if (value !== "") {
      setType(value);
    } else {
      setType("");
    }
  };

  console.log(type);

  const handleSubmit = async () => {
    const data = {
      cardID: card._id,
      id: id,
      price: parseInt(price),
      quantity: quantity,
      item: item,
      image: imagePreview,
      size: size,
      type: type,
    };

    if (
      data.id === "" ||
      data.price === "" ||
      !data.image ||
      data.type === ""
    ) {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      await updateCard(data).then((res) => {
        history.push({
          pathname: slug.productManager,
          search: `?product=${card.type}`,
        });
      });
    }
  };
  return (
    <Grid>
      <div className="header-title">
        <span>Cập nhật thông tin thiệp</span>
      </div>
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} xs={12}>
          <div className="news-title ">
            <span>Loại thiệp:</span>
            {defaultSelect ? (
              <CategorySelect category={type} handleChange={handleChangeType} />
            ) : (
              <></>
            )}

            {/* <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              label="Loại thiệp"
              disabled={true}
              key={card?.type}
              defaultValue={card?.type}
              // onChange={handleChangeTitle}
            /> */}
          </div>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <div className="news-title ">
            <span>Mã thiệp:</span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              label="Mã thiệp"
              key={card?.id}
              defaultValue={card?.id}
              onChange={(e) => {
                handleChangeValue(e, 1);
              }}
            />
          </div>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <div className="news-title ">
            <span>Giá tiền:</span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              label="Giá tiền"
              key={card?.price}
              defaultValue={card?.price}
              type="number"
              onChange={(e) => {
                handleChangeValue(e, 2);
              }}
            />
          </div>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <div className="news-title ">
            <span>Kích thước:</span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              label="Kích thước"
              key={card?.size}
              defaultValue={card?.size}
              onChange={(e) => {
                handleChangeValue(e, 3);
              }}
            />
          </div>
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <div className="news-title ">
            <span>Chất liệu:</span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              label="Chất liệu"
              key={card?.quantity}
              defaultValue={card?.quantity}
              onChange={(e) => {
                handleChangeValue(e, 4);
              }}
            />
          </div>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <div className="news-title ">
            <span>Thành phần: </span>
          </div>

          <Grid container spacing={2}>
            {listsItem}
            <Grid item lg={4} md={4} xs={8}>
              <TextField
                id="item-name"
                variant="outlined"
                style={{ width: "100%" }}
                label="Tên"
                name="name"
                onChange={handleChangeItem}
                required={true}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={2}>
              <TextField
                id="item-price"
                variant="outlined"
                style={{ width: "100%" }}
                label="Giá tiền"
                type="number"
                name="price"
                onChange={handleChangeItem}
              />
            </Grid>
            <div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                // startIcon={<EditIcon />}
                style={{
                  textTransform: "none",
                  float: "right",
                  marginBottom: "0px !important",
                }}
                className="mt-3"
                onClick={handleClickAddItem}
              >
                Thêm mới
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <div className="news-title ">
            <span>Hình ảnh: </span>
          </div>
          <ImagePreivews
            url={imagePreview}
            handleChangeImage={handleChangeImage}
          />
        </Grid>
      </Grid>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          // startIcon={<EditIcon />}
          style={{
            textTransform: "none",
            float: "right",
            marginBottom: "0px !important",
          }}
          className="mt-3"
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </div>
    </Grid>
  );
}
