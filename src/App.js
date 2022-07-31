import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import StaffList from "./components/StaffListComponent";
import { STAFFS, DEPARTMENTS } from "./shared/staffs";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import PhongBan from "./components/PhongBan";
import BangLuong from "./components/BangLuong";
import RenderStaff from "./components/RenderStaffComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  render() {
    var { staffs, keyword, sort } = this.props;
    var staff = staffs.filter((staff) => {
      return staff.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    var staffSort = staffs.sort((a, b) => {
      if (
        Number(Math.round(a.salaryScale * 3000000 + a.overTime * 200000)) >
        Number(Math.round(b.salaryScale * 3000000 + b.overTime * 200000))
      )
        return sort.value;
      else if (
        Number(Math.round(a.salaryScale * 3000000 + a.overTime * 200000)) <
        Number(Math.round(b.salaryScale * 3000000 + b.overTime * 200000))
      )
        return -sort.value;
      else return 0;
    });

    const RenderWithId = ({ match }) => {
      return (
        <RenderStaff
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0]
          }
        />
      );
    };

    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={() => <StaffList staffs={staff} />}
            ></Route>
            <Route
              exact
              path="/nhanvien"
              component={() => <StaffList staffs={staff} />}
            ></Route>
            <Route exact path="/nhanvien/:id" component={RenderWithId}></Route>
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
              component={() => <BangLuong staffs={staffSort} />}
            ></Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    keyword: state.keyword,
    sort: state.sort,
  };
};

export default connect(mapStateToProps)(App);
