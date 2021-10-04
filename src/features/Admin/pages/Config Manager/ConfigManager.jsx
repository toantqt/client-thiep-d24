import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getPointConfig, updatePointConfig } from "../../../../api/adminAPI";

export default function ConfigManager(props) {
  const [config, setConfig] = useState();
  const [point, setPoint] = useState("");
  const [money, setMoney] = useState("");
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getPointConfig().then((res) => {
      setConfig(res.data);
      setPoint(res.data.point);
      setMoney(res.data.money);
    });
    props.handleLoading(false);
  }, [reload]);

  const handleChangeConfig = (event) => {
    if (event.target.name === "money") {
      setMoney(event.target.value);
    } else {
      setPoint(event.target.value);
    }
  };

  const handleSubmit = async () => {
    if (!money || !point) {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      const data = {
        money: money,
        point: point,
      };
      props.handleLoading(true);
      await updatePointConfig(data).then((res) => {
        setReload(!reload);
      });
    }
  };
  return (
    <Grid>
      <div className="header-title">
        <span>Cấu hình tích điểm:</span>
      </div>
      <Grid container spacing={2} className="mt-2">
        <Grid item lg={4} md={4} xs={6}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Giá tiền:
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Giá tiền"
            name="money"
            key={config?.money}
            defaultValue={config?.money}
            onChange={handleChangeConfig}
            type="number"
          />
        </Grid>
        <Grid item lg={4} md={4} xs={6}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Điểm tích lũy:
          </span>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Điểm tích lũy"
            // disabled={true}
            name="point"
            key={config?.point}
            defaultValue={config?.point}
            onChange={handleChangeConfig}
            type="number"
          />
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
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
              Cập nhật
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
