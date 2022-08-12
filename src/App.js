import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import StaffList from "./components/StaffList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhongBan from "./components/PhongBan";
import BangLuong from "./components/BangLuong";
import RenderStaff from "./components/RenderStaff";
import {
  fetchStaffs,
  fetchDept,
  fetchSalary,
  postStaff,
} from "./reducers/ActionCreators";
import DepartmentDetail from "./components/DepartmentDetail";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAddStaff = this.handleAddStaff.bind(this);
  }

  handleAddStaff(staff) {
    const id = this.props.staffs.staffs.length;
    const newStaff = { id, ...staff };
    this.props.postStaff(newStaff);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDept();
    this.props.fetchSalary();
  }

  render() {
    // Chức năng search
    var { keyword } = this.props.keyword;
    var staff = this.props.staffs.staffs.filter((staff) => {
      return staff.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    // Hiển thị chi tiết nhân viên
    const RenderWithId = ({ match }) => {
      return (
        <RenderStaff
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0]
          }
          dept={this.props.dept.dept}
        />
      );
    };

    // Hiển thị nhân viên theo phòng ban
    const RenderWithDept = ({ match }) => {
      const deptId = match.params.deptId;
      return <DepartmentDetail deptId={deptId} />;
    };

    return (
      <div className="App">
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route
                exact
                path="/"
                component={() => (
                  <StaffList
                    staffs={
                      this.props.keyword.keyword.length > 0
                        ? staff
                        : this.props.staffs
                    }
                    dept={this.props.dept.dept}
                    onStaffChange={this.handleAddStaff}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/nhanvien"
                component={() => (
                  <StaffList
                    staffs={
                      this.props.keyword.keyword.length > 0
                        ? staff
                        : this.props.staffs
                    }
                    dept={this.props.dept.dept}
                    onStaffChange={this.handleAddStaff}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/nhanvien/:id"
                component={RenderWithId}
              ></Route>
              <Route
                exact
                path="/phongban"
                component={() => <PhongBan dept={this.props.dept} />}
              ></Route>
              <Route
                exact
                path="/phongban/:deptId"
                component={RenderWithDept}
              ></Route>
              <Route
                exact
                path="/bangluong"
                component={() => (
                  <BangLuong salary={this.props.salary} staffs={staff} />
                )}
              ></Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    dept: state.dept,
    salary: state.salary,
    keyword: state.keyword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStaffs: () => dispatch(fetchStaffs()),
    fetchDept: () => dispatch(fetchDept()),
    fetchSalary: () => dispatch(fetchSalary()),
    postStaff: (newStaff) => dispatch(postStaff(newStaff)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
