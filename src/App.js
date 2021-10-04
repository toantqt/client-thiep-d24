import { Route, Redirect, HashRouter } from "react-router-dom";
import LoginPage from "./features/Login/pages/LoginPage";
import { isLoggedIn, checkRole } from "./auth/auth";
import HomePage from "./features/Admin/pages/Home/HomePage";
function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={LoginPage}></Route>
      <Route
        path="/admin"
        render={() =>
          isLoggedIn() && checkRole("admin") ? (
            <HomePage />
          ) : (
            <Redirect to="/" />
          )
        }
      ></Route>
    </HashRouter>
  );
}

export default App;
