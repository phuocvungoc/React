import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Input,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "Sale",
      annualLeave: 0,
      overTime: 0,
      salary: 3000000,
      image: "/assets/images/ngoctrinh.png",
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    this.props.onStaffChange(this.state);
  }

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
            <Form onSubmit={this.handleSubmit}>
              <FormGroup className="row">
                <Label htmlFor="name" className="col-5">
                  Họ và Tên
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Họ và tên"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="doB" className="col-5">
                  Ngày sinh
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="date"
                  id="doB"
                  name="doB"
                  value={this.state.doB}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="startDate" className="col-5">
                  Ngày vào công ty
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="department" className="col-5">
                  Phòng Ban
                </Label>
                <select
                  className="col-6 ml-3"
                  type="department"
                  id="department"
                  name="department"
                  value={this.state.department}
                  onChange={this.handleInputChange}
                >
                  <option>Sale</option>
                  <option>HR</option>
                  <option>Marketing</option>
                  <option>IT</option>
                  <option>Finance</option>
                </select>
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="salaryScale" className="col-5">
                  Hệ số lương
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="salaryScale"
                  id="salaryScale"
                  name="salaryScale"
                  value={this.state.salaryScale}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="annualLeave" className="col-5">
                  Số ngày nghỉ còn lại
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="annualLeave"
                  id="annualLeave"
                  name="annualLeave"
                  value={this.state.annualLeave}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="overTime" className="col-5">
                  Số ngày làm thêm
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="overTime"
                  id="overTime"
                  name="overTime"
                  value={this.state.overTime}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Thêm
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <div className="row">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;
