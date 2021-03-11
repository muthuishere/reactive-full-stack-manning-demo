import React, {Fragment} from 'react';
import './App.css';
import ChooseService from './choose-service-slot/ChooseService'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";
import ChooseSlot from "./choose-service-slot/ChooseSlot";
import {Route, Switch} from "react-router";

import LoadingIndicatorComponent from "./common/loader/loading-indicator-component";
import AppNotificationComponent from "./common/notification/app-notification-component";


function App() {
  return (
<Fragment>
<Router>
  <LoadingIndicatorComponent></LoadingIndicatorComponent>

    <div>

          <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
              <a className="navbar-brand" href="/">Ar Salon & Day Spa</a>
          </nav>
          <main role="main" className="container">
              <div className="padding-container">
                  <Switch>
                      <Route exact path="/" component={ChooseService}>
                      </Route>
                      <Route path="/chooseslot/:serviceId/:serviceName"  component={ChooseSlot}>
                      </Route>

                      <Route>
                          <ChooseService />
                      </Route>
                  </Switch>


              </div>
          </main>
      </div>
    <AppNotificationComponent></AppNotificationComponent>
</Router>
</Fragment>
  );
}

export default App;
