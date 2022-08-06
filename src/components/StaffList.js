import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class StaffList extends Component {
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
    switch (value.department) {
      case "Sale":
        var department = this.props.departments[0];
        break;

      case "HR":
        department = this.props.departments[1];
        break;

      case "Marketing":
        department = this.props.departments[2];
        break;

      case "IT":
        department = this.props.departments[3];
        break;

      case "Finance":
        department = this.props.departments[4];
        break;

      default:
        break;
    }

    var dataStaff = {
      name: value.name,
      doB: value.doB,
      salaryScale: value.salaryScale,
      startDate: value.startDate,
      department: department,
      annualLeave: value.annualLeave,
      overTime: value.overTime,
      image: "/assets/images/ngoctrinh.png",
    };
    this.props.onStaffChange(dataStaff);
  };

  render() {
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className="col-6 col-md-4 col-lg-2 mt-3" key={staff.id}>
          <Card>
            <CardBody className="border border-success rounded">
              <Link to={`/nhanvien/${staff.id}`}>
                <CardImg src={staff.image} alt={staff.name} />
              </Link>
              <CardText className="text-center mt-4">{staff.name}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <Button className="mt-3 ml-0" onClick={this.toggleModal}>
          Thêm Nhân Viên
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Thêm Nhân Viên Mới</ModalHeader>
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
                  defaultValue="Sale"
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
                  defaultValue="1"
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
                  defaultValue="0"
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
                  defaultValue="0"
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
                Thêm
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
        <div className="row">{staffList}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    departments: state.departments,
  };
};

export default connect(mapStateToProps)(StaffList);
