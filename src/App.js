import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import NotFound from "./pages/notfound/notfound.component";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route component={NotFound} status={404} />
      </Switch>
    </div>
  );
}

export default App;
