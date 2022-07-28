import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import StaffList from "./components/StaffListComponent";
import { STAFFS, DEPARTMENTS } from "./shared/staffs";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route exact path="/home"></Route>
            <Route exact path="/nhanvien"></Route>
            <Route exact path="/phongban"></Route>
            <Route exact path="/bangluong"></Route>
          </Switch>
          <StaffList staffs={this.state.staffs} />
          <Footer></Footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
