import { Redirect, Route, Switch } from "react-router-dom";
import slug from "../../resources/slug";
import UserManager from "../../features/Admin/pages/User Manager/UserManager";
import ApproveUser from "../../features/Admin/pages/User Manager/ApproveUser";
import ProductManager from "../../features/Admin/pages/Product Manager/ProductManager";
import OrderManager from "../../features/Admin/pages/Order Manager/OrderManager";

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
    </Switch>
  );
}
export default AdminRoutes;
