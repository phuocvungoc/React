import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import StaffList from "./components/StaffListComponent";
import { STAFFS, DEPARTMENTS } from "./shared/staffs";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import PhongBan from "./components/PhongBan";
import BangLuong from "./components/BangLuong";

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
            <Route
              exact
              path="/nhanvien"
              component={() => <StaffList staffs={this.state.staffs} />}
            ></Route>
            <Route
              exact
              path="/phongban"
              component={() => (
                <PhongBan departments={this.state.departments} />
              )}
            ></Route>
            <Route
              exact
              path="/bangluong"
              component={() => <BangLuong staffs={this.state.staffs} />}
            ></Route>
          </Switch>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
