import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Loading } from "./Loading";

class BangLuong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary:
        this.props.keyword.keyword.length > 0
          ? this.props.staffs
          : this.props.salary.salary,
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.salaryDown = this.salaryDown.bind(this);
    this.salaryUp = this.salaryUp.bind(this);
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  salaryDown = () => {
    var staffList = this.props.salary.salary;
    staffList.sort(function (a, b) {
      return b.salary - a.salary;
    });
    this.setState({
      salary: staffList,
    });
  };

  salaryUp = () => {
    var staffList = this.props.salary.salary;
    staffList.sort(function (a, b) {
      return a.salary - b.salary;
    });
    this.setState({
      salary: staffList,
    });
  };

  render() {
    // Hiển thị danh sách lương nhân viên
    if (this.props.salary.isLoading) {
      return (
        <div className="container ">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.salary.errMess) {
      return (
        <div className="container">
          <div className="row mt-2">
            <h3 style={{ color: "red" }}>{this.props.salary.errMess}</h3>
          </div>
        </div>
      );
    } else {
      const ListBangLuong = this.state.salary.map((staff) => {
        return (
          <div className="col-12 col-lg-4 col-md-6 mt-3" key={staff.id}>
            <Card>
              <CardBody className="border border-success rounded">
                <CardTitle>{staff.name}</CardTitle>
                <CardText>Mã nhân viên: {staff.id}</CardText>
                <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                <CardFooter className="text-muted">
                  Lương:{" "}
                  {Math.round(
                    staff.salaryScale * 3000000 + staff.overTime * 200000
                  )}
                </CardFooter>
              </CardBody>
            </Card>
          </div>
        );
      });

      return (
        <div className="container">
          <div className="row mt-3">
            <div className="col-6 col-lg-10 col-md-8 col-sm-8">
              <Button className="hidden">
                <Link to="/nhanvien">Nhân viên</Link>
              </Button>
              <Button className="ml-3">
                <Link to="/bangluong">Bảng lương</Link>
              </Button>
            </div>
            <div className="col-2 col-lg-2 col-md-2 col-sm-2">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>Sắp xếp lương</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.salaryUp}>
                    <i
                      className="fa fa-sort-numeric-asc"
                      aria-hidden="true"
                    ></i>{" "}
                    Tăng dần
                  </DropdownItem>
                  <DropdownItem onClick={this.salaryDown}>
                    {" "}
                    <i
                      className="fa fa-sort-numeric-desc"
                      aria-hidden="true"
                    ></i>{" "}
                    Giảm dần
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="row">{ListBangLuong}</div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    keyword: state.keyword,
  };
};

export default connect(mapStateToProps)(BangLuong);
