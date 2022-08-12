import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Control, LocalForm, Errors } from "react-redux-form";
import { connect } from "react-redux";
import { updateStaff } from "../reducers/ActionCreators";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

// Hàm hiển thị ảnh
function RenderImg({ staff }) {
  return (
    <div className="col-12 col-lg-3 col-md-4 col-sm-12 ">
      <Card>
        <CardImg src={staff.image} alt={staff.name} />
      </Card>
    </div>
  );
}

// Hàm hiển thị thông tin chi tiết nhân viên
function RenderDetails({ staff, dept }) {
  return (
    <div className="col-12 col-lg-9 col-md-8 col-sm-12">
      <CardBody>
        <CardTitle>Họ và tên: {staff.name}</CardTitle>
        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
        <CardText>
          Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
        </CardText>
        <CardText>
          Phòng ban: {dept.find((dept) => dept.id === staff.departmentId).name}
        </CardText>
        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
      </CardBody>
    </div>
  );
}

// Hiển thị chi tiết nhân viên
class RenderStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit = (value) => {
    var dataStaff = {
      id: this.props.staff.id,
      name: value.name,
      doB: value.doB,
      salaryScale: value.salaryScale,
      startDate: value.startDate,
      departmentId: this.props.dept.find(
        (dept) => dept.name === value.department
      ).id,
      annualLeave: value.annualLeave,
      overTime: value.overTime,
      image: "/assets/images/alberto.png",
      salary: (value.salaryScale * 3000000 + value.overTime * 200000).toFixed(
        0
      ),
    };
    this.props.updateStaff(dataStaff);
  };

  render() {
    if (this.props.staff) {
      return (
        <div className="container">
          <Button className="mt-3 ml-0" onClick={this.toggleModal}>
            Sửa thông tin
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader>Sửa thông tin</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                <FormGroup className="row">
                  <Label htmlFor="name" className="col-5">
                    Họ và Tên
                  </Label>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    defaultValue={this.props.staff.name}
                    className="col-6 ml-3 form-control"
                    placeholder="Họ và tên"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      minLength: "Tên nhân viên phải nhiều hơn 3 kí tự",
                      maxLength: "Tên nhân viên phải ít hơn 10 kí tự",
                    }}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label htmlFor="doB" className="col-5">
                    Ngày sinh
                  </Label>
                  <Control.text
                    model=".doB"
                    id="doB"
                    name="doB"
                    defaultValue={dateFormat(this.props.staff.doB, "isoDate")}
                    className="col-6 ml-3 form-control"
                    type="date"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: "Vui lòng nhập ngày sinh của nhân viên",
                    }}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label htmlFor="startDate" className="col-5">
                    Ngày vào công ty
                  </Label>
                  <Control.text
                    model=".startDate"
                    className="col-6 ml-3 form-control"
                    type="date"
                    id="startDate"
                    name="startDate"
                    defaultValue={dateFormat(
                      this.props.staff.startDate,
                      "isoDate"
                    )}
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Vui lòng nhập ngày vào công ty",
                    }}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label htmlFor="department" className="col-5">
                    Phòng Ban
                  </Label>
                  <Control.select
                    model=".department"
                    className="col-6 ml-3 form-control"
                    type="select"
                    id="department"
                    name="department"
                    defaultValue={this.props.staff.department}
                    validators={{
                      required,
                    }}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".department"
                    show="touched"
                    messages={{
                      required: "Vui lòng chọn phòng ban",
                    }}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label htmlFor="salaryScale" className="col-5">
                    Hệ số lương
                  </Label>
                  <Control.text
                    model=".salaryScale"
                    className="col-6 ml-3 form-control"
                    type="salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    defaultValue={this.props.staff.salaryScale}
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      required: "Vui lòng nhập hệ số lương",
                      isNumber: "Chỉ nhập số",
                    }}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label htmlFor="annualLeave" className="col-5">
                    Số ngày nghỉ còn lại
                  </Label>
                  <Control.text
                    model=".annualLeave"
                    className="col-6 ml-3 form-control"
                    type="annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    defaultValue={this.props.staff.annualLeave}
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      required: "Vui lòng nhập ngày phép còn lại",
                      isNumber: "Chỉ nhập số",
                    }}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label htmlFor="overTime" className="col-5">
                    Số giờ tăng ca
                  </Label>
                  <Control.text
                    model=".overTime"
                    className="col-6 ml-3 form-control"
                    type="overTime"
                    id="overTime"
                    name="overTime"
                    defaultValue={this.props.staff.overTime}
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".overTime"
                    show="touched"
                    messages={{
                      required: "Vui lòng nhập số giờ làm thêm",
                      isNumber: "Chỉ nhập số",
                    }}
                  />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  OK
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>

          <ButtonGroup className="mt-3 success">
            <Button>
              <Link to="/nhanvien">Nhân viên</Link>
            </Button>
            <Button>{this.props.staff.name}</Button>
          </ButtonGroup>
          <div className="container">
            <div className="row border border-success rounded mt-3">
              <RenderImg staff={this.props.staff} />
              <RenderDetails staff={this.props.staff} dept={this.props.dept} />
            </div>
          </div>
        </div>
      );
    } else return <div></div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStaff: (staff) => dispatch(updateStaff(staff)),
  };
};

export default connect(null, mapDispatchToProps)(RenderStaff);
