import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import StaffList from "./components/StaffList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhongBan from "./components/PhongBan";
import BangLuong from "./components/BangLuong";
import RenderStaff from "./components/RenderStaff";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAddStaff = this.handleAddStaff.bind(this);
  }

  handleAddStaff(addStaff) {
    const id = this.props.staffs.length;
    const newStaff = { id, ...addStaff };
    this.props.addStaff(newStaff);
  }

  render() {
    // Chức năng search
    var { staffs, keyword, sort, departments } = this.props;
    var staff = staffs.filter((staff) => {
      return staff.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    // Chức năng sắp xếp
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

    // Hiển thị chi tiết nhân viên
    const RenderWithId = ({ match }) => {
      return (
        <RenderStaff
          staff={
            staffs.filter(
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
              component={() => (
                <StaffList staffs={staff} onStaffChange={this.handleAddStaff} />
              )}
            ></Route>
            <Route
              exact
              path="/nhanvien"
              component={() => (
                <StaffList staffs={staff} onStaffChange={this.handleAddStaff} />
              )}
            ></Route>
            <Route exact path="/nhanvien/:id" component={RenderWithId}></Route>
            <Route
              exact
              path="/phongban"
              component={() => <PhongBan departments={departments} />}
            ></Route>
            <Route
              exact
              path="/bangluong"
              component={() => (
                <BangLuong staffs={staff} staffSorts={staffSort} />
              )}
            ></Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

// Lấy giá trị từ Redux thành props
const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    keyword: state.keyword,
    sort: state.sort,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addStaff: (newStaff) => dispatch({ type: "ADD_STAFF", payload: newStaff }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
