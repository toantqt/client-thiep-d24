import { Redirect, Route, Switch } from "react-router-dom";
import slug from "../../resources/slug";
import UserManager from "../../features/Admin/pages/User Manager/UserManager";
import ApproveUser from "../../features/Admin/pages/User Manager/ApproveUser";
import ProductManager from "../../features/Admin/pages/Product Manager/ProductManager";
import OrderManager from "../../features/Admin/pages/Order Manager/OrderManager";
import ConfirmOrder from "../../features/Admin/pages/Confirm Order/ConfirmOrder";
import EditProduct from "../../features/Admin/pages/Product Manager/EditProduct";
import ConfigManager from "../../features/Admin/pages/Config Manager/ConfigManager";
import GiftManager from "../../features/Admin/pages/Gift Manager/GiftManager";
import AddGift from "../../features/Admin/pages/Gift Manager/AddGift";
import EditGift from "../../features/Admin/pages/Gift Manager/EditGift";
import VoucherManager from "../../features/Admin/pages/Voucher Manager/VoucherManager";
import AddVoucherUser from "../../features/Admin/pages/Voucher Manager/AddVoucherUser";
function AdminRoutes(props) {
  //   <Route exact path={SLUGS.dashboard} component={DashboardComponent} />;
  const loading = props.handleLoading;
  return (
    <Switch>
      <Route
        exact
        path={slug.userManager}
        render={() => <UserManager handleLoading={props.handleLoading} />}
      />
      <Route
        exact
        path={slug.approveUser}
        render={() => <ApproveUser handleLoading={props.handleLoading} />}
      />
      <Route
        exact
        path={slug.productManager}
        render={(props) => (
          <ProductManager
            handleLoading={loading}
            query={props.location.search}
          />
        )}
      />

      <Route
        exact
        path={slug.orderManager}
        render={() => <OrderManager handleLoading={props.handleLoading} />}
      />

      <Route
        exact
        path={slug.confrimOrder}
        render={() => <ConfirmOrder handleLoading={props.handleLoading} />}
      />

      <Route
        exact
        path={slug.editCard}
        render={(props) => <EditProduct {...props} handleLoading={loading} />}
      />

      <Route
        exact
        path={slug.configManager}
        render={() => <ConfigManager handleLoading={loading} />}
      />

      <Route
        exact
        path={slug.giftManager}
        render={() => <GiftManager handleLoading={loading} />}
      />

      <Route
        exact
        path={slug.addGift}
        render={() => <AddGift handleLoading={loading} />}
      />

      <Route
        exact
        path={slug.editGift}
        render={(props) => <EditGift {...props} handleLoading={loading} />}
      />

      <Route
        exact
        path={slug.voucherManager}
        render={() => <VoucherManager handleLoading={loading} />}
      />

      <Route
        exact
        path={slug.addVoucherUser}
        render={() => <AddVoucherUser handleLoading={loading} />}
      />
    </Switch>
  );
}
export default AdminRoutes;
