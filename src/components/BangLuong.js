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
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class BangLuong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  onClick = (sortBy, sortValue) => {
    this.props.onSort({
      by: sortBy,
      value: sortValue,
    });
  };

  render() {
    // Biến staffsLuong nhận giá trị theo tương tác của người dùng
    if (this.props.keyword === "") {
      var staffsLuong = this.props.staffSorts;
    } else {
      staffsLuong = this.props.staffs;
    }

    // Hiển thị danh sách lương nhân viên theo biến staffsLuong nhận đc
    const ListBangLuong = staffsLuong.map((staff) => {
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
                <DropdownItem onClick={() => this.onClick("name", 1)}>
                  <i className="fa fa-sort-numeric-asc" aria-hidden="true"></i>{" "}
                  Tăng dần
                </DropdownItem>
                <DropdownItem onClick={() => this.onClick("name", -1)}>
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

// Lấy giá trị từ Redux
const mapStateToProps = (state) => {
  return {
    keyword: state.keyword,
    sort: state.sort,
  };
};

// Dispatch dữ liệu người dùng muốn sắp xếp vào Redux để xử lí
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSort: (sort) => dispatch({ type: "SORT", payload: sort }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BangLuong);
