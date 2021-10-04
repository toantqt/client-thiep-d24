import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addGift } from "../../../../api/adminAPI";
import slug from "../../../../resources/slug";
import { useHistory } from "react-router-dom";

export default function AddGift(props) {
  const history = useHistory();
  const [config, setConfig] = useState();
  const [point, setPoint] = useState();
  const [gift, setGift] = useState("");
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(false);
  }, []);

  const handleChangeConfig = (event) => {
    if (event.target.name === "gift") {
      setGift(event.target.value);
    } else {
      setPoint(event.target.value);
    }
  };

  console.log(point);

  const handleSubmit = async () => {
    const data = {
      gift: gift,
      point: point,
    };
    if (data.gift === "" || !data.point) {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      await addGift(data).then((res) => {
        return history.push(slug.giftManager);
      });
    }
  };
  return (
    <Grid>
      <div className="header-title">
        <span>Thêm quà tặng mới: </span>
      </div>
      <Grid container spacing={2} className="mt-2">
        <Grid item lg={8} md={8} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Thông tin quà tặng:
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Quà tặng"
            name="gift"
            key={config?.money}
            defaultValue={config?.money}
            onChange={handleChangeConfig}
          />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Điểm quy đổi
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Điểm"
            // disabled={true}
            name="point"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handleChangeConfig}
            type="number"
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <div style={{ width: "100%", height: "60px" }}>
            <Button
              variant="contained"
              color="primary"
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
      </Grid>
    </Grid>
  );
}
